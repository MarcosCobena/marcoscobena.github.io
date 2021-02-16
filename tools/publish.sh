pushd ../
dotnet run --project RSS/RSS.csproj
git commit -a -m "✨: update items"
git push
popd