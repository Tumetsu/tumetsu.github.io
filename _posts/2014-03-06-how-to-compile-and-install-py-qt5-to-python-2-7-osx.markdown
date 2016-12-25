---
layout: post
title:  "How to compile and install PyQt5 to Python 2.7 (OSX)"
date:   2014-03-06
categories: guide python


---


Recently I got involved in Python development. As I had learnt the basics of Qt at the university courses, I decided

to give a spin for PyQt. In general PyQt5 seems great, but I had few problems with it. Mainly that Riverbank Computing
 only offers installations for Python 3.3. As good as Python 3 is, I couldn’t find any good freezing solutions and few other
 dependencies are still not available for it. So I decided to compile PyQt for Python 2.7. Since this was a small adventure
 for Python newbie and straightforward Googling didn’t result me any clear guides, here is my documentation of the process.

Note that if you are using Windows, [there is an excellent pre-compiled binary for Windows as well as the documentation of the build-process and installation](http://www.abstractfactory.io/blog/pyqt5-1-1-for-python-2-7/)
[process](http://www.abstractfactory.io/blog/pyqt5-1-1-for-python-2-7/).

While the following documentation was done in OSX Mavericks, the general process is probably same with all modern
 OSX versions. I also imagine that the build process will be similar in Linux.

1. **Make sure you have all required tools and source code**
[PyQt5 source]( http://www.riverbankcomputing.co.uk/software/pyqt/download5)
[SIP source]( http://www.riverbankcomputing.co.uk/software/sip/download)
[Qt5]( http://qt-project.org/downloads)
 All relevant XCode tools to build applications from commandline.

2. Extract the *SIP tar-file* and check the *Readme*-file. It’s mostly about if you downloaded the SIP from its Mercurial
 repository and extra-actions involved. Check it quickly if something there applies to you. The actual installation
 instructions can be found from *doc* folder.

3. Doc directory contains html-files and *Installation* page with isntructions for installation. Below are the mainpoints of the process which should
get you through.

3.1. Configurate SIP by executing *configure.py*. Make sure that you are using the Python interpreter you want the SIP and Qt5 to be installed. In
my case *Python 2.7.6*. You can check the Python’s version with command `python --version`

3.2. The *configure.py* has lots of optional arguments. There is summary on the docs page. There might be some interesting options. In my case
I omitted all extra options.

3.3. Next issue `make` command to build the SIP. This is the part which requires XCode, so if you get errors about compiler not being available, check
that you *Xcode commandline tools* installed.
3.4. After compiling, use command `make install` which should install the SIP to your Python interpreter. This may require admin-privileges.

4.0. Now when the SIP is compiled and installed, it’s time to do same to the PyQt5. Extract the *PyQt5 tar-file* and check the *README* inside. It has installation instructions. Below is description of the process I went through:

4.1. Configurate PyQt5 by executing the *configure.py*. Again, check that you are using the right Python interpreter! It has to be same as we used with SIP.
At this moment I got notification that *qmake* is missing from my PATH. Qmake is a tool which is used when Qt-applications are compiled.

To add qmake to my PATH, I first located
 it from `/users/[my user name]/Qt/5.1.1/clang_64/bin` which is the installation location of my Qt5. To add it to my PATH, I added the following line to
 my *.bash_profile* in my user home directory:
`export PATH=/users/tuomas/Qt5.2.1/5.2.1/clang_64/bin:$PATH`
After restarting the Terminal, qmake was available and I could run the *configure.py*.

4.2. Now is probably good time to check configure.py’s numerous options in case there is something there which applies to you. In my case I didn’t need any additional
 arguments so I pressed forward.

4.3. Issue command `make` and wait patiently until the compilation process ends. This might take some time. Afterwards issue command `make install`. Now PyQt5 should be installed to your Python interpreter and all related classes etc. should be importable to your Python 2.7 applications!

As you can see the process isn’t really that difficult. However, in case you don’t want to build the PyQt yourself and are okay with using Python 3.3, you can install it relatively easily by [Homebrew package manager](http://brew.sh/).

###  PyQt and cx_freeze

This goes slightly outside the scope of this article but I think it is worth to note it here. In case you want to create stand-alone application out of your   PyQt-application, you can use[ cx_freeze](http://cx-freeze.sourceforge.net/) or [other similar applications](http://www.pyinstaller.org/).

So far I have had success only in Windows while in OSX I seem to encounter one strange error message after another. One of these strange errors which you might encounter is a syntax-error message when packing your application with cx_freeze.  I solved this issue by method described in this [Stack Overflow post](http://stackoverflow.com/questions/20590113/syntaxerror-when-using-cx-freeze-on-pyqt-app)

Basically just go to directory `/usr/local/lib/python2.7/site-packages/PyQt5/uic` (exact path may vary, basically it’s the location where Python packages get installed) and rename the folder
 *port_v3* to something else. After this the freezing process should execute properly. I had to do this on my Windows machine too.


