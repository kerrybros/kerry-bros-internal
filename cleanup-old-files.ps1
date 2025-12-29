# Cleanup Script - Removes old Next.js files
# Run this when you're ready to remove the old structure

Write-Host "🧹 Cleaning up old Next.js files..." -ForegroundColor Cyan

$foldersToRemove = @("src", "EXTRACTION_PACKAGE")
$filesToRemove = @("env.example")

foreach ($folder in $foldersToRemove) {
    if (Test-Path $folder) {
        Write-Host "  Removing $folder/" -ForegroundColor Yellow
        Remove-Item -Recurse -Force $folder
    }
}

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Write-Host "  Removing $file" -ForegroundColor Yellow
        Remove-Item -Force $file
    }
}

# Keep prisma folder temporarily in case you need to reference migrations
Write-Host ""
Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Note: The old 'prisma/' folder was kept for reference." -ForegroundColor Gray
Write-Host "The new schema is at packages/server/prisma/schema.prisma" -ForegroundColor Gray
Write-Host ""
Write-Host "You can safely delete 'prisma/' folder when ready." -ForegroundColor Gray
Write-Host "The 'public/' folder can also be deleted (favicon already copied)." -ForegroundColor Gray

