$projectName = "preventivatoreedileai"
$envVar = "GEMINI_API_KEY"
$envValue = "AQ.Ab8RN6LRsDZHWWEBmfCE6xdun5ICCV-W-lieulA8NoJ5RYq2wA"

# Leggi il token di Vercel (deve essere settato in environment variable VERCEL_TOKEN)
$vercelToken = $env:VERCEL_TOKEN

if (-not $vercelToken) {
    Write-Error "VERCEL_TOKEN not set!"
    exit 1
}

# API endpoint per aggiungere env var
$url = "https://api.vercel.com/v9/projects/$projectName/env"
$headers = @{
    "Authorization" = "Bearer $vercelToken"
    "Content-Type" = "application/json"
}

$body = @{
    key = $envVar
    value = $envValue
    type = "encrypted"
    target = @("production", "preview", "development")
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
    Write-Output "✅ Environment variable added successfully!"
    Write-Output $response | ConvertTo-Json
} catch {
    Write-Error "Failed to add env var: $($_.Exception.Message)"
    exit 1
}
