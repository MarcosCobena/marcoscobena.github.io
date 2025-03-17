// Run directly at root folder:
// > dotnet run --project .\RSS\RSS.csproj

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Xml;
using HeyRed.MarkdownSharp;
using Jint;

namespace RSS
{
    class Program
    {
        const int AmountOfItemsForRss = 10;
        const string DateParseFormat = "d/M/yyyy";
        const string Email = "marcoscobena@outlook.com";
        const string FeedDescription = "Marcos' Blog";
        const string FeedPath = "feed.rss";
        const string FullName = "Marcos Cobeña Morián";
        const string ItemFilenamePathFormat = "items/{0}.md";
        const string ItemsJavaScriptPath = "items/items.js";
        const string Link = "https://marcoscobena.github.io";

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
                DateTimeStyles.AssumeUniversal,
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
            var engine = new Engine()
                .SetValue("addPost", (string title, string filename, string date, string[] tags) => 
                {
                    var item = new ItemModel
                    {
                        Title = title,
                        MarkdownFilename = filename,
                        Date = ParseDate(date),
                    };
                    items.Add(item);
                })
                .SetValue("addItem", (string _, string __, string ___) => { /*Intentionally empty*/ })
                .SetValue("addRedirection", (string _, string __) => { /*Intentionally empty*/ });
            engine.Execute(File.ReadAllText(ItemsJavaScriptPath));
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
