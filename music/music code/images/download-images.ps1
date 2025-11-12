# PowerShell script to download placeholder album art images
# Run this script to download sample images for your music player

Write-Host "Downloading album art placeholder images..." -ForegroundColor Green

$imageUrls = @(
    "https://picsum.photos/500/500?random=1",
    "https://picsum.photos/500/500?random=2",
    "https://picsum.photos/500/500?random=3",
    "https://picsum.photos/500/500?random=4",
    "https://picsum.photos/500/500?random=5"
)

for ($i = 0; $i -lt $imageUrls.Length; $i++) {
    $fileName = "album$($i + 1).jpg"
    $url = $imageUrls[$i]
    
    try {
        Write-Host "Downloading $fileName..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $fileName -ErrorAction Stop
        Write-Host "Successfully downloaded $fileName" -ForegroundColor Green
    }
    catch {
        $errorMsg = $_.Exception.Message
        Write-Host "Failed to download $fileName : $errorMsg" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Done! Images have been downloaded to the images folder." -ForegroundColor Green
Write-Host "You can now use these images in your music player playlist." -ForegroundColor Cyan

