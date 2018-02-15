﻿using System;
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
		const string DateParseFormat = "d/M/yyyy";
        const string Email = "marcoscm.digital@gmail.com";
        const string FalseLowercase = "false";
        const string FeedDescription = "I write apps for people using Xamarin";
        const string FeedPath = "feed.rss";
        const string FullName = "Marcos Cobeña Morián";
        const string ItemFilenamePathFormat = "items/{0}.md";
        const string ItemsJavaScriptPath = "items/items.js";
        const string Link = "https://marcoscobena.com";

        static void Main(string[] args)
        {
            var newItemTitle = args[0];
            var newItemFilename = args[1];
            var newItemDate = args[2];
            var newItemIsHidden = FalseLowercase;

            if (args.Length >= 4)
            {
                newItemIsHidden = args[3] ?? FalseLowercase;
            }

            string newItemCategory = null;

            if (args.Length >= 5)
            {
                newItemCategory = args[4];
            }

            if (!File.Exists(string.Format(ItemFilenamePathFormat, newItemFilename)))
            {
                Console.WriteLine($"Sorry, we can't find item {newItemFilename}.");
                return;
            }

            AddItemToJavaScript(newItemTitle, newItemFilename, newItemDate, newItemIsHidden, newItemCategory);

            var items = ReadItems();
            GenerateRss(items);

            //Process.Start("git", $"add items/{newItemFilename}.md");
            //Process.Start("git", $"commit items/items.js -m \"Added WILT\"");
            //Process.Start("git", "push origin master");
        }

        static void AddItemToJavaScript(string title, string filename, string date, string isHidden = FalseLowercase, 
                                        string category = null)
        {
            var currentContent = File.ReadAllText(ItemsJavaScriptPath);
            var addItemCall = $"addItem(\"{title}\", \"{filename}\", \"{date}\", {isHidden}, \"{category}\");";

            if (currentContent.Contains(addItemCall))
            {
                return;
            }

            var itemDate = DateTime.ParseExact(date, DateParseFormat, CultureInfo.InvariantCulture);
            UseNowIfDateIsToday(ref itemDate);
            addItemCall = $"addItem(\"{title}\", \"{filename}\", \"{itemDate}\", {isHidden}, \"{category}\");";
            File.WriteAllText(ItemsJavaScriptPath, addItemCall + Environment.NewLine + currentContent);
        }

        static void GenerateRss(IEnumerable<dynamic> items)
        {
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
                    var permalink = $"{Link}/#/{item.MarkdownFilename}";

                    DateTime itemDate = item.Date;
                    UseNowIfDateIsToday(ref itemDate);

                    var syndicationItem = new SyndicationItem
                    {
                        Title = item.Title,
                        Description = markdown.Transform(markdownText),
                        Published = itemDate
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

        static DateTime ParseDate(string date)
        {
            var successParsing = DateTime.TryParseExact(date, DateParseFormat, CultureInfo.InvariantCulture, 
                                                        DateTimeStyles.None, out DateTime parsedDate);

            if (!successParsing)
            {
                parsedDate = DateTime.Parse(date);
            }

            return parsedDate;
        }

        static IEnumerable<dynamic> ReadItems()
        {
            var items = new List<dynamic>();

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

        static void UseNowIfDateIsToday(ref DateTime itemDate)
        {
            var justNow = DateTime.Now;

            if (justNow.Day == itemDate.Day && justNow.Month == itemDate.Month && justNow.Year == itemDate.Year)
            {
                itemDate = justNow;
            }
        }
    }
}