using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Xml;
using HeyRed.MarkdownSharp;
using Microsoft.SyndicationFeed;
using Microsoft.SyndicationFeed.Rss;

namespace CLI 
{
    class Program
    {
        const string AddItemChunk = "addPost(";
        const int AmountOfItemsForRss = 10;
        const string CommandName = "Amedio";
        const string DateParseFormat = "d/M/yyyy";
        const string Email = "marcoscm.digital@gmail.com";
        const string FeedDescription = "Marcos' Blog";
        const string FeedPath = "feed.rss";
        const string FullName = "Marcos Cobeña Morián";
        const string ItemFilenamePathFormat = "items/{0}.md";
        const string ItemsJavaScriptPath = "items/items.js";
        const string Link = "https://marcoscobena.com";
        const string RssCommand = "rss";
        // TODO pass relative path as param
        const string WebRootPath = "/Users/marcos/Repositorios/marcoscobena";

        static void Main(string[] args)
        {
            if (args == null || !args.Any())
            {
                PrintUsage();
                return;
            }

            var command = args[0];

            if (command == RssCommand)
            {
                Say("Sure! Let's build that RSS for you");

                var items = ReadItems();
                var latestItems = items.OrderByDescending(item => item.Date)
                                       .Take(AmountOfItemsForRss);
                var totalItems = items.Count();
                var latestTotalItems = latestItems.Count();
                Say($"I've found {totalItems} items but will take the latest {latestTotalItems}");

                WriteRss(latestItems);

                Say($"Done! Here it's your {FeedPath} file, make sure you upload it!");
            }
            else
            {
                PrintUsage();
                return;
            }

            Say("Ciao!");
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

        static void PrintUsage()
        {
            Say($"Currently I just handle \"{CommandName} {RssCommand}\" to create such with the {AmountOfItemsForRss} latest " +
                "items");
            Say("But Marcos' told me he's got some more stuff in mind for me...");
        }

        static IEnumerable<ItemModel> ReadItems()
        {
            var items = new List<ItemModel>();

            using (var itemsFile = File.OpenText($"{WebRootPath}/{ItemsJavaScriptPath}"))
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

            return items;
        }

        static void Say(string message)
        {
            Console.WriteLine($"🐵: {message}");
        }

        static void WriteRss(IEnumerable<ItemModel> items)
        {
            var streamWritter = File.CreateText($"{WebRootPath}/{FeedPath}");

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
                    var markdownText = File.ReadAllText($"{WebRootPath}/{itemPath}");
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
        }

        private class ItemModel
        {
            public DateTime Date { get; set; }

            public string MarkdownFilename { get; set; }

            public string Title { get; set; }
        }
    }
}
