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
        const string AddItemChunk = "addItem(";
        const int AmountOfItemsForRss = 10;
		const string DateParseFormat = "d/M/yyyy";
        const string Email = "marcoscm.digital@gmail.com";
        const string FeedDescription = "I write apps for people using Xamarin";
        const string FeedPath = "feed.rss";
        const string FullName = "Marcos Cobeña Morián";
        const string ItemFilenamePathFormat = "items/{0}.md";
        const string ItemsJavaScriptPath = "items/items.js";
        const string Link = "https://marcoscobena.com";
        const string RssCommand = "rss";

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
                Say("OK, OK... I'll build that RSS for you, was sure you weren't able by your-self");

                var items = ReadItems();
                var latestItems = items.OrderByDescending(item => item.Date)
                                       .Take(AmountOfItemsForRss);
                var totalItems = items.Count();
                var latestTotalItems = latestItems.Count();
                Say($"I've found {totalItems} items but will take latest {latestTotalItems}");

                WriteRss(items);

                Say($"There it's your {FeedPath} file, don't become so much crazy");
            }
            else
            {
                PrintUsage();
                return;
            }

            Say("Adiós...");
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
            Say($"I only accept \"hyde {RssCommand}\" to create such with {AmountOfItemsForRss} latest items");
            Say("And don't bother so much...");
        }

        static IEnumerable<dynamic> ReadItems()
        {
            var items = new List<dynamic>();

            using (var itemsFile = File.OpenText($"../{ItemsJavaScriptPath}"))
            {
                var line = itemsFile.ReadLine();

                while (line != null)
                {
                    if (!line.StartsWith(AddItemChunk, StringComparison.InvariantCulture))
                    {
                        line = itemsFile.ReadLine();
                        continue;
                    }

                    // addItem("App screen creation template", "app-screen-creation-template", "17/2/2017", false, "Xamarin");
                    var justParams = line.Replace(AddItemChunk, string.Empty)
                                         .Replace(");", string.Empty);
                    var paramsList = justParams.Split(',')
                                               .Select(param => param.Trim().Trim('"'));
                    var date = ParseDate(paramsList.ElementAt(2));
                    var item = new
                    {
                        Title = paramsList.First(),
                        MarkdownFilename = paramsList.ElementAt(1),
                        Date = date,
                        Hidden = bool.Parse(paramsList.ElementAtOrDefault(3) ?? false.ToString()),
                        Category = paramsList.ElementAtOrDefault(4)
                    };

                    if (!item.Hidden)
                    {
                        items.Add(item);
                    }

                    line = itemsFile.ReadLine();
                }
            }

            return items;
        }

        static void Say(string message)
        {
            Console.WriteLine($"👹: {message}");
        }

        static void WriteRss(IEnumerable<dynamic> items)
        {
            var streamWritter = File.CreateText($"../{FeedPath}");

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
                    var markdownText = File.ReadAllText($"../{itemPath}");
                    var permalink = $"{Link}/#/{item.MarkdownFilename}";

                    var syndicationItem = new SyndicationItem
                    {
                        Title = item.Title,
                        Description = markdown.Transform(markdownText),
                        Published = item.Date
                    };
                    syndicationItem.AddContributor(new SyndicationPerson(FullName,
                                                                         $"{Email} ({FullName})"));
                    syndicationItem.AddLink(new SyndicationLink(new Uri(permalink), "guid"));

                    string category = item.Category;

                    if (!string.IsNullOrWhiteSpace(category))
                    {
                        syndicationItem.AddCategory(new SyndicationCategory(category));
                    }

                    writer.Write(syndicationItem);
                }

                xmlWriter.Flush();
            }
        }
    }
}
