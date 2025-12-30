#!/bin/bash
# Render Cron Job Script with Cold Start + Retry Logic
# Handles sleeping services and rate limiting

set +e  # Don't exit on errors, we handle them

echo "🔄 Starting cache refresh job..."

# Configuration
API_BASE="${RENDER_EXTERNAL_URL:-https://kerry-bros-internal-oonu.onrender.com}"
HEALTH_URL="${API_BASE}/api/health"
REFRESH_URL="${API_BASE}/api/admin/refresh-cache"
MAX_WAKE_ATTEMPTS=18  # 90 seconds to wake up
MAX_REFRESH_RETRIES=3

echo ""
echo "========================================="
echo "STEP 1: WAKING UP SERVICE"
echo "========================================="

# Wake up the service first
attempt=1
service_awake=false

while [ $attempt -le $MAX_WAKE_ATTEMPTS ]; do
    echo "[Wake $attempt/$MAX_WAKE_ATTEMPTS] Pinging health endpoint..."
    
    if curl -f -s --connect-timeout 10 --max-time 20 "$HEALTH_URL" > /dev/null 2>&1; then
        echo "✅ Service is awake!"
        service_awake=true
        break
    fi
    
    echo "⏳ Not ready yet, waiting 5s..."
    sleep 5
    attempt=$((attempt + 1))
done

if [ "$service_awake" = false ]; then
    echo "❌ Service failed to wake up after 90s"
    exit 1
fi

# Let it stabilize
echo "⏳ Stabilizing for 5s..."
sleep 5

echo ""
echo "========================================="
echo "STEP 2: REFRESHING CACHE"
echo "========================================="

# Attempt cache refresh with retries
refresh_attempt=1
success=false

while [ $refresh_attempt -le $MAX_REFRESH_RETRIES ] && [ "$success" = false ]; do
    echo "[Refresh $refresh_attempt/$MAX_REFRESH_RETRIES] Calling refresh endpoint..."
    
    response=$(curl -s -w "\n%{http_code}" -X POST "$REFRESH_URL" \
        -H "Authorization: Bearer ${REFRESH_TOKEN}" \
        -H "Content-Type: application/json" \
        --connect-timeout 30 \
        --max-time 120)
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    echo "Response: $body"
    echo "Status: $http_code"
    
    if [ "$http_code" = "200" ]; then
        echo "✅ Cache refresh successful!"
        success=true
    elif [ "$http_code" = "429" ]; then
        echo "⚠️ Rate limited (429)"
        if [ $refresh_attempt -lt $MAX_REFRESH_RETRIES ]; then
            delay=$((10 * refresh_attempt))
            echo "⏳ Waiting ${delay}s before retry..."
            sleep $delay
        fi
    else
        echo "❌ Request failed with status $http_code"
        if [ $refresh_attempt -lt $MAX_REFRESH_RETRIES ]; then
            echo "⏳ Waiting 10s before retry..."
            sleep 10
        fi
    fi
    
    refresh_attempt=$((refresh_attempt + 1))
done

echo ""
echo "========================================="

if [ "$success" = true ]; then
    echo "✅ JOB COMPLETED SUCCESSFULLY"
    exit 0
else
    echo "❌ JOB FAILED AFTER ALL RETRIES"
    exit 1
fi

