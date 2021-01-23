// Run directly at root folder:
// > dotnet run --project .\RSS\RSS.csproj

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Text.RegularExpressions;
using System.Xml;
using HeyRed.MarkdownSharp;

namespace RSS 
{
    class Program
    {
        const string AddItemChunk = "addPost(";
        const int AmountOfItemsForRss = 10;
        const string DateParseFormat = "d/M/yyyy";
        const string Email = "marcoscm.digital@gmail.com";
        const string FeedDescription = "Marcos' Blog";
        const string FeedPath = "feed.rss";
        const string FullName = "Marcos Cobeña Morián";
        const string ItemFilenamePathFormat = "items/{0}.md";
        const string ItemsJavaScriptPath = "items/items.js";
        const string Link = "https://marcoscobena.com";

        static void Main(string[] args)
        {
            var items = ReadLatestItems();
            WriteRss(items);
        }

        static DateTime ParseDate(string date)
        {
            var successParsing = DateTime.TryParseExact(
                date, 
                DateParseFormat, 
                CultureInfo.InvariantCulture, 
                DateTimeStyles.AssumeLocal, 
                out DateTime parsedDate);

            if (!successParsing)
            {
                parsedDate = DateTime.Parse(date);
            }

            return parsedDate;
        }

        static IEnumerable<ItemModel> ReadLatestItems()
        {
            Console.Write("Reading items... ");
            
            var items = new List<ItemModel>();

            using (var itemsFile = File.OpenText(ItemsJavaScriptPath))
            {
                var line = itemsFile.ReadLine();
                var regex = new Regex("\"[^\"]+\"", RegexOptions.Compiled);

                while (line != null)
                {
                    if (!line.StartsWith(AddItemChunk, StringComparison.InvariantCulture))
                    {
                        line = itemsFile.ReadLine();
                        continue;
                    }

                    // addPost("How to centralize font-related styling", "2018-3-15", "16/3/2018", ['en']);
                    var matches = regex.Matches(line);
                    var item = new ItemModel
                    {
                        Title = matches[0].Value.Trim('"'),
                        MarkdownFilename = matches[1].Value.Trim('"'),
                        Date = ParseDate(matches[2].Value.Trim('"')),
                    };
                    items.Add(item);

                    line = itemsFile.ReadLine();
                }
            }

            var latestItems = items
                .OrderByDescending(item => item.Date)
                .Take(AmountOfItemsForRss);
            var totalItems = items.Count();
            var latestTotalItems = latestItems.Count();

            Console.WriteLine($"done! Top latest {latestTotalItems} / {totalItems}");

            return latestItems;
        }

        static void WriteRss(IEnumerable<ItemModel> items)
        {
            Console.Write("Writting feed... ");
            
            var feed = new SyndicationFeed(FullName, FeedDescription, new Uri(Link));
            var author = new SyndicationPerson($"{Email} ({FullName})", FullName, Link);
            feed.Authors.Add(author);

            var markdown = new Markdown();
            var feedItems = new List<SyndicationItem>();

            foreach (var item in items)
            {
                var itemPath = string.Format(ItemFilenamePathFormat, item.MarkdownFilename);
                var markdownText = File.ReadAllText(itemPath);
                var permalink = new Uri($"{Link}/?i={item.MarkdownFilename}");

                var syndicationItem = new SyndicationItem(item.Title, markdown.Transform(markdownText), permalink)
                {
                    PublishDate = item.Date.ToUniversalTime()
                };
                syndicationItem.Authors.Add(author);
                
                feedItems.Add(syndicationItem);
            }

            feed.Items = feedItems;

            using (var rssWriter = XmlWriter.Create(FeedPath, new XmlWriterSettings { Indent = true }))
            {
                feed.LastUpdatedTime = DateTime.UtcNow;
                feed.SaveAsRss20(rssWriter);
            }
            
            Console.WriteLine($"done! {FeedPath}");
        }

        public class ItemModel
        {
            public DateTime Date { get; set; }

            public string MarkdownFilename { get; set; }

            public string Title { get; set; }
        }
    }
}
