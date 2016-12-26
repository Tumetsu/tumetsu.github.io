---
layout: post
title:  "How to get Finland&#x27;s map to geoJSON and display it in D3js"
date:   2014-03-14
categories: guide data visualization d3js
thumb: "finland.png"
cover: "covers/finland.png"
---


Lately I have been studying [D3js](http://d3js.org) and data-visualizing for web. For that purposes inspired by [Scott Murrays brilliant free D3js ebook](http://chimera.labs.oreilly.com/books/1230000000345/index.html)‘s example of map of U.S.A I wanted to try create a similar map for Finland with 2014 municipalities showing on the map so that I could visualize something municipality related data. This turned out both simple and difficult to do in practice which is why I’m writing here the basic process I went through. Below is the resulting map which shows the populations of every Finnish municipality:

<div id="viz">
<div id="tooltip" class="hidden">
<p><strong><span id="kunta"></span></strong></p>
<p id="vakiluku">sdf</p>
</div>
</div>
<script type="text/javascript" src="/assets/other/finland-viz/d3/d3.min.js"></script>
<script type="text/javascript" src="/assets/other/finland-viz/script.js"></script>
<link href="/assets/other/finland-viz/style.css" rel="stylesheet" type="text/css">

## Creating a geoJSON file

First I went and downloaded map data for Finland from [National Land Survey of Finland’s open data service](http://www.maanmittauslaitos.fi/en/opendata). Problem is that the provided data is in xml-format while the d3js requires a geoJSON format.

Next I downloaded a [QGIS, a free opensource map-software](http://www.qgis.org/) which lets you to open different map fileformats like shape-files, gml, geojson etc. which allowed me to open the map and save it to geoJSON. However, in this case the coordinates where still in wrong format to display correctly in d3js. What I did next should be possible in QGIS but I eventually ended up using ogr2ogr commandline tool. [Check this guide how to install it on your computer](http://chimera.labs.oreilly.com/books/1230000000345/ch12.html#_acquiring_and_parsing_geodata). Personally I used a Mac and installed it with homebrew method described in the link.

I saved the xml file to a shape file in QGIS and then issued the following command in my Mac’s terminal:
`ogr2ogr -f 'GeoJSON' -s_srs suomi.prj -t_srs 'EPSG:4326'  output.geojson suomi.shp`

Where *suomi.prj* and *suomi.shp* were shape files created by QGIS. As far as I understand the command, the ‘GeoJSON’ tells the tool to create a geoJSON file and *EPSG:4326* is the target coordinate format required to display the map of Finland properly. Note that *ogr2ogr* can probably do the conversion directly from original xml format. I went with shape files since most examples in internet used shape-files in their conversions.


## Modifying the geoJSON for my purposes

Now I had a working geoJSON file which I could feed to my d3js code to display the map of Finland. At this point you may want to extract the names of the municipalities for tooltip-box like I did. In the result geoJSON file it is in the following format:

`"text": "(2:Alajärvi,Alajärvi)"`

Where first name is the name of the municipality in Finnish and the second one in Swedish. For more experienced JSON-wizards there may be a way to extract the first entry by code but I decided to remove the Swedish names and edit the format into

`"text": "Alajärvi"`

For this I used SublimeText 2’s regular expression search and replace.* *I opened the geoJSON file in SublimeText and selected Find>Replace and enabled the regular expression mode and put following strings to search and replace fields:

```
"text": "+\(\d+:([^,]+),(.*?)\)
"text": $1
```

These regular expressions select the text field from the file and captures the first entry after “(2:” substring to $1. Second line then replaces the selected area with a captured entry.

Now you should be able to get the municipality’s name from its entry’s text property. Except that now some municipalities have strange names like: “Länsi- ja Sisä-Suomen aluehallintovirasto” which you probably don’t want. I’m not sure why the mapdata had these entries. My solution was to manually track down the wrong names, check their location on my d3js map and renamed them to their correct names. Interestingly in  the geoJSON there were the correct municipalities, but they didn’t get drawn so I removed them altogether. To you to avoid this work check the files in the end of this post.


## Displaying the final map in D3js

This is rather straightforward if you had read the Scott Murray’s example for U.S.A. The tricky part is to choose the projection since unlike U.S Finland doesn’t have a built in projection in D3js. After some googling and trial and error I ended up in the following lines of code to display the map correctly:

``` javascript
var projection = d3.geo.transverseMercator()
.rotate([-27,-65,0])
.translate([w/2, h/2])
.scale([4000])
```
Where w and h are the size of the SVG. Note that the scale draws the map in 4x enlargement.

## Files to download

Finally to save this work from you below are the geoJSON file, a demonstration html-page of the visualization and as a bonus a csv with population values for each municipality.

* [Sample script.js](/assets/other/finland-viz/script.js)
* [Sample html](/assets/other/finland-viz/geo.html)
* [Finland geoJSON](/assets/other/finland-viz/finland.geojson)
* [Population csv](/assets/other/finland-viz/kuntavakiluku.csv)

If you have any insights on how to skip the work in modifying the geoJSON file or changing the coordinates in QGIS, I’m interested in hearing about them since I’m still learning!


