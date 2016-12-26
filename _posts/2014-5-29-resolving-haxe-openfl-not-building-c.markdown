---
layout: post
title:  "Resolving Haxe - OpenFL not building for C++ targets"
date:   2014-5-29 15:31:52 +0200
categories: guide c++ haxe
thumb: "haxe-logo.png"
cover: "covers/haxe-logo.png"
---

Recently I have been getting into [Haxe programming language](http://haxe.org/). For those unfamiliar with it, it is a very interesting language originally developed by [Nicolas Cannasse](https://twitter.com/ncannasse). The “gimmick” of it is that the developer can utilize Actionscript 3 -esque syntax for programming then compile the game into Flash, C++, Java, PHP, HTML5 and other targets. For Flash developers there is OpenFL-library which replicates Flash API on all the target platforms, which should excite every Flash developer who is considering to move on from Flash. For my current project I’m using a port of Flashpunk called [Haxepunk](http://haxepunk.com/). But enough of that. While the Haxe is very promising it still has a small community and sometimes finding solutions to certain problems can be tricky. Like the one described here.

I was trying to compile my project into Windows C++ target but kept getting the following error:


    error C2039: ‘blit’ : is not a member of   ‘Array_obj<ELEM_>’
     with
     [
     ELEM_=unsigned char
     ]

Apparently while writing this the default C++ compile library is *hxlibc* while with OpenFL one needs to use *hxcpp*. To build on C++ target one has to force the use of hxcpp with this commandline option:

`lime test windows –build-library=hxcpp`

It took me sometime to find the solution from the internet so I decided to document it here. I’ll probably document other possible problems and solutions I encounter when I get more familiar with Haxe and OpenFL.


