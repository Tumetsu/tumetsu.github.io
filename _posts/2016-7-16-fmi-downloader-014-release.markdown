---
layout: post
title:  "FMI-Downloader 0.14 released"
date:   2016-7-3 15:31:52 +0200
categories: open-data science weather data
image: "covers/thunder-clouds.jpg"
cover: "covers/thunder-clouds.jpg"
---

About year ago I rapidly developed a simple weather downloading client for Lammi Biological Station to retrieve weather data from Finnish Meteorological Institute's open data service. App worked but code was relatively a mess and in hindsight contained some bugs. Lately I have been getting support mails from people about using the app and thanking me of creating it. I checked download count which was a bit over 300, which was more than I expected, so I decided it would be worthwhile to do some heavy refactoring, fix bugs which people had encountered and release an update.

I'm happy to announce that the new release is here!
If you have used FMIDownloader before I highly recommend you to update since newest version contains a lot of bug fixes, ui improvements and automatical update checking for future updates. Below are download links and more specific list of new changes.

[Download FMIDownloader for Windows](https://github.com/Tumetsu/FMI-weather-downloader/releases/tag/v0.14)

#### New features
* Downloader will automatically find the starting point of available data if station won't have data from exact request point onwards.
* Automatical update notifications to notify about future releases and updates
* More comprehensive About information
* Minor user interface improvements
* More informative error messages
* Smaller application size

#### Bug fixes
* Timezones are handled now correctly
* Application will notify user when FMI query-limit is exceeded
* Resulting csv will contain exact dates as specified in query, no longer missing any from beginning or end of the time span
* Other small bug fixes

#### Other
* Portable zip-release for people who don't want to use installer
* Refactored source code heavily, cleaned ui code a lot and unit tests added for api-code
* Pandas and Numpy dependencies dropped

Most of the changes are probably hard to notice for regular users at first but many downloading tasks and updating are now done in a better way. Most of the changes are however about cleaning the old implementation and rewriting parts of the qt-code in a more sane way. Refactoring and unit tests should improve the maintainability of the app.

We will see the what future holds for the FMIDownloader. There is a backlog of feasible features I could add in when I have time for that. Another thing I'd like to do is Mac-release which might happen depending on if I'll get cx_freeze to behave correctly on OSX with Python 3.5.

[Cover image by John Kerstholt](http://commons.wikimedia.org/wiki/Commons:Photo_challenge/2014_-_December_-_Bad_weather#/media/File:Rolling-thunder-cloud.jpg)