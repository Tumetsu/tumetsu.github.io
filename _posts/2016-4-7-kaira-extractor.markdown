---
layout: post
title:  "Kaira extractor"
date:   2016-4-16 15:31:52 +0200
categories: science software python
thumb: "karelians.jpg"
cover: "covers/karelians.jpg"
---

Year ago I was working on Lammi Biological Station on various tasks. One of the most interesting ones was a project to extract data from old matrikel books into digitized Excel compatible format. Resulting data set was supposed to be used in statistical research. The project began from trying to extract the data of Finnish Winter War soldiers from a book series *Suomen Rintamamiehet 1939-43*. [You can find earlier description of the project from another blog post](/finnish-soldiers-from-book-to-excel/). After a considerable success with soldier data we decided to extend it to other matrikel series and develop a software I later named as **Kaira**.

#### So what are these matrikels any way?
For whatever reason in past there has been a trend in Finland to catalogue information of groups of people in different book series. They were done by interviewing people and then compiling huge books containing short descriptions of people's life stories with varying information. Most of the series we worked on were from 70's. Below are series included into *Kaira*:

* Suomen Rintamamiehet 1939-43
* Suomen Pienviljelijät
* Siirtokarjalaisten tie
* Suuret maatilat

Since these book series contain a lot of data of certain interesting groups of people, such as people who migrated from Karelia during the wars, they represent potential data for research. Problem was that this data was in natural language in a old books. Luckily John Loehr, researcher from Lammi Biological Station had already scanned multiple books into pdfs which let me to extract the text from them for analyzing.

#### What is Kaira?
Kaira is a tool I developed to read scanned text from a fore mentioned book series and extract as much of the data as possible automatically. In addition of extraction features, Kaira also provides simple interface to manually edit and improve the data before exporting it to csv or json formats.

#### So how is the data extracted?
First raw text files were converted into xml-file with each person's data separated into tag. This conversion was done with regex-patterns and using *ABBYY Finereader*'s html-export which produced good enough structure to find the relevant text from books.

Matrikels were mostly written in a very structured way with information presented mostly in same order in each person's entry. This made it possible to use regular expressions to extract most of the data. For example text entry might read something like:

> AHONEN, Lauri Olavi. Synt. 12.3.1907, Alajärvi. Pso. Helena o.s. Metsälä, synt. 25.8.1912.

In this case there is man's name first, then his birthdate and place. Finally there is his spouses name, original surname and birthdate. Since most of the text was written in this way, *Kaira* was designed to be essentially a regular expression framework, which during the extraction tracks the location of the extraction in data entry. Some data, for example dates, were easy to extract as a pattern, but the birth location was identifiable only by position in text (after birth date).

Kaira's design is mostly a pipeline of extractor classes with custom rules for each data piece tracking their location in the text. Required regexes were developed by inspecting the source text and identifying patterns of data.

Below is an illustration of this process:
![](/assets/images/post-images/kaira-process.jpg)

### User interface
During the development I noticed that it was hopeless to produce a perfect extraction results automatically. Often authors had deviated from their text patterns during writing breaking the regex-formulas or OCR had mistaken some of the vital words in text making them unrecognizable by software.

Answer was to develop a GUI in *PyQt5* for end user to view the extracted data and perform some simple fixing actions on it:
![](/assets/images/post-images/kaira-screenshot.png)

In picture, on left there is a list of every person in a one book. Center column includes data entries of three different persons in the book to be edited manually and compare to the extracted results on right column. On last column UI shows extracted data from current entry with coloring fields to yellow or red it considers missing or erroneous. User can improve the analyzer by editing the original text in middle column or inserting data to fields on right manually.

#### Location data
Some of the books had location names attached to people. Books about migrating Karelians had lists of their living places with years they spent there. I quickly noticed that I could add GPS-coordinates using these names and a location name database. After some search I found a huge data set of Finnish location names and their GPS coordinates. I added them to a MongoDB which is then queried everytime extractor encounters a place name. This produced interesting geographical material about the migration patterns. Coordinates were added to the extraction results when they were found.

#### Exporting
After data is analyzed, it is saved into xml-file to be analyzed later again by *Kaira*. For other uses each book series has a csv-export and json-export which transform the data into more useful formats for post processing.

#### Used technologies
Software was written in Python using MongoDB as a location database and PyQt5 as gui-library.

#### What could be improved
Later I finally got around studying relational databases and nowadays I think that I should have designed a SQLite database to save the extraction results instead of using XML-file for that. SQLite export would lead to few interesting applications such as easy querying and perhaps a web-interface.

User interface and editing features was developed rather late in the project and I had to learn PyQt well enough. Due this it's lacking many useful features and could be vastly improved in every regard.

Finally since the project was rather complicated and evolved organically, I didn't have a full architecture designed explicitly. There is some sub-optimal design decisions and strange parts in code. I also wish I had known about a proper unit testing since it would have helped a lot during the development.

#### End result
In the end I'm happy about how Kaira turned out regardless of its flaws. It was really intriguing and challenging to design and I was happy to design the algorithms and extraction patterns.

#### Availability
Kaira and user manual are available on my [Github profile](https://github.com/Tumetsu/Kaira). Required data sets and scanned texts are not public but in case you need them for research, you can contact me or [John Loehr](http://www.helsinki.fi/lammi/henkilot/hkunta.html).

Cover image from [SA-kuva](sa-kuva.fi)