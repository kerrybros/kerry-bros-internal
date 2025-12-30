#!/bin/bash
# Render Cron Script with Cold Start Handling
# Wakes up the service first, then refreshes cache

set -e

API_BASE="${RENDER_EXTERNAL_URL:-https://kerry-bros-internal-oonu.onrender.com}"
HEALTH_URL="${API_BASE}/api/health"
REFRESH_URL="${API_BASE}/api/admin/refresh-cache"

echo "🌅 Step 1: Waking up the service (may take 30-60s)..."

# Wake up the service with health check (allow up to 90 seconds)
MAX_WAKE_ATTEMPTS=18  # 18 attempts * 5s = 90s max
attempt=1

while [ $attempt -le $MAX_WAKE_ATTEMPTS ]; do
    echo "🔍 Ping attempt $attempt/$MAX_WAKE_ATTEMPTS..."
    
    if curl -f -s --connect-timeout 10 --max-time 20 "$HEALTH_URL" > /dev/null 2>&1; then
        echo "✅ Service is awake and responding!"
        break
    fi
    
    if [ $attempt -eq $MAX_WAKE_ATTEMPTS ]; then
        echo "❌ Service failed to wake up after 90s"
        exit 1
    fi
    
    echo "⏳ Waiting 5s before next attempt..."
    sleep 5
    attempt=$((attempt + 1))
done

# Give it 5 more seconds to fully stabilize
echo "⏳ Letting service stabilize..."
sleep 5

echo ""
echo "🔄 Step 2: Refreshing cache..."

response=$(curl -s -w "\n%{http_code}" -X POST "$REFRESH_URL" \
    -H "Authorization: Bearer ${REFRESH_TOKEN:-kerry-refresh-prod-2024-a8f3d9e2b1c4}" \
    -H "Content-Type: application/json" \
    --connect-timeout 30 \
    --max-time 120)

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

echo "Response: $body"
echo "Status: $http_code"

if [ "$http_code" = "200" ]; then
    echo "✅ Cache refresh successful!"
    exit 0
else
    echo "❌ Cache refresh failed with status $http_code"
    exit 1
fi

