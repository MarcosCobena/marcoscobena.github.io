// Run directly at root folder:
// > dotnet run --project .\RSS\RSS.csproj

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Xml;
using HeyRed.MarkdownSharp;
using Microsoft.SyndicationFeed;
using Microsoft.SyndicationFeed.Rss;

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
            var successParsing = DateTime.TryParseExact(date, DateParseFormat, CultureInfo.InvariantCulture, 
                                                        DateTimeStyles.AssumeLocal, out DateTime parsedDate);

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

                while (line != null)
                {
                    if (!line.StartsWith(AddItemChunk, StringComparison.InvariantCulture))
                    {
                        line = itemsFile.ReadLine();
                        continue;
                    }

                    // addPost("How to centralize font-related styling", "2018-3-15", "16/3/2018");
                    var justParams = line.Replace(AddItemChunk, string.Empty)
                                         .Replace(");", string.Empty);
                    // "Abanico, a few hours with Xamarin.Forms and SkiaSharp", "abanico-a-few-hours-with-xamarin-forms-and-skiasharp", "21/6/17"
                    var paramsList = justParams.Split(new[] { "\", \"" }, StringSplitOptions.None)
                                               .Select(param => param.Trim().Trim('"'));
                    var date = ParseDate(paramsList.ElementAt(2));
                    var item = new ItemModel
                    {
                        Title = paramsList.First(),
                        MarkdownFilename = paramsList.ElementAt(1),
                        Date = date
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
            
            var streamWritter = File.CreateText(FeedPath);

            using (var xmlWriter = XmlWriter.Create(streamWritter, new XmlWriterSettings { Indent = true }))
            {
                var writer = new RssFeedWriter(xmlWriter);
                writer.WriteTitle(FullName);
                writer.WriteDescription(FeedDescription);
                writer.WriteValue("link", Link);
                var markdown = new Markdown();

                foreach (var item in items)
                {
                    var itemPath = string.Format(ItemFilenamePathFormat, item.MarkdownFilename);
                    var markdownText = File.ReadAllText(itemPath);
                    var permalink = $"{Link}/?i={item.MarkdownFilename}";

                    var syndicationItem = new SyndicationItem
                    {
                        Title = item.Title,
                        Description = markdown.Transform(markdownText),
                        Published = item.Date
                    };
                    syndicationItem.AddContributor(new SyndicationPerson(FullName,
                                                                         $"{Email} ({FullName})"));
                    syndicationItem.AddLink(new SyndicationLink(new Uri(permalink), "guid"));

                    writer.Write(syndicationItem);
                }

                xmlWriter.Flush();
            }
            
            Console.WriteLine($"done! {FeedPath}");
        }

        private class ItemModel
        {
            public DateTime Date { get; set; }

            public string MarkdownFilename { get; set; }

            public string Title { get; set; }
        }
    }
}
