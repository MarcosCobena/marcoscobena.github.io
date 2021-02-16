pushd ../
dotnet run --project RSS/RSS.csproj
git add -A && git commit -m "✨: update items"
git push
popd