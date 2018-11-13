---
layout: post
title:  "Setting up an encrypted personal wiki and diary with Vimwiki and Cryptomator"
date:   2018-11-13T19:27:40.277Z
categories: vim wiki


---
Multiple times in my life I have tried to keep a diary or log of my life and thoughts. 
Usually this has failed by me not writing entries regularly. Part of the reason has been the lack of 
good tools for the task. Most distributed diary software are subscription based and store the data in a proprietary 
or otherwise difficult file format. 

These problems led me to few requirements for my diary needs:

1. Text editor should be powerful and easy to use.
2. The content should be saved in plain text format so that I can be sure it is readable in far future.
3. The content should be secured by encryption.
4. The tool should be free and not depend on a specific service.

## Vimwiki 
Sometime ago I found about *[VimWiki](https://github.com/vimwiki/vimwiki)* which is a Vim plugin for personal wiki and diary. The plugin adds shortcuts to 
create and organize files to a wikilike structure with interconnected wikiarticles and easy link and page generation. 
You can read introduction to the Vimwiki from these great blog posts: 
* [Vimwiki](https://www.smoothterminal.com/articles/vimwiki)
* [Getting started with VimWiki](https://blog.mague.com/?p=602)

I prefer using *Vim* for most of my everyday text editing tasks so *Vimwiki* obviously solved the number 1. of my 
requirements. The plugin also fills the second requirement since the whole wiki is just a directory of plain text files. 
The plugin and *Vim* itself are also free and open source tools so the requirement 4 is no problem either.

The remaining issues are the encryption and the sharing of the wiki between my multiple PCs. My immediate thought 
was to share the wiki via Dropbox. However, first I had to figure out how to encrypt the wiki before uploading it to the cloud service like Dropbox. 

## Cryptomator
I evaluated some file based encryption options. I wanted something which could encrypt individual files so that 
Dropbox could sync them efficiently. 
There are well known Unix tools suchs as *[EncFs](https://wiki.archlinux.org/index.php/EncFS)* and *[EcryptFs](https://wiki.archlinux.org/index.php/ECryptfs)* for this kind of tasks.
After a brief evaluation it seemed like *EncFs* is not actively developed and has some invulnerabilities and 
*EcryptFs* seemed a bit difficult to use and is not really cross-platform.

The best option I could find so far was the open source application *[Cryptomator](https://cryptomator.org)*
which is designed for encrypting files for cloud services like Dropbox. 
Cryptomator supports Windows, Linux, MacOS and in some degree mobile platforms so it seemed ideal for my purposes.

## Setup Vimwiki with Cryptomator
First you obviously need to install Vim, Vimwiki and Cryptomator. This guide also
assumes you are using Unix based platform, be it Linux, MacOS or something else.

### .vimrc
By default Vim creates *.swp* files to the same directory where the edited file is located. Normally this is fine 
but if these files are saved to the Vimwiki directory, they are synced to the cloud and will then cause trouble when 
you edit the file with another PC.

I decided to add the following line to my .vimrc to save the swap-files to a single location:

```
" Aggregate all vim swap files to a one place
set directory^=$HOME/.vim/swapfiles//
```

Make sure this does not cause any problems with your specific environment.
Make also sure to first create the _swapfiles_ directory to your _.vim/_ directory!

### Cryptomator setup
First you should create a new Cryptomator vault which is located inside your
cloud synced directory. The instructions to the vault creation can be found from the
[Cryptomator's user guide](https://community.cryptomator.org/t/english-desktop-user-manual/30)

After creating the new vault, unlock and open it in your file manager. 
Take note of the file path of the vault. For example in my case it is _/home/tuomas/.Cryptomator/wiki2vKBC3-TQebG/_.

By default *Vimwiki* creates _vimwiki_ directory to your home directory and _vimwiki_html_ for HTML-version of your wiki.
These directories have to be moved to our secured Cryptomator vault, so first move them to the path you noted before. 

Then create symlinks from your home directory to your vault:

```
ln -s /path/to/your/vault/vimwiki ~/vimwiki
ln -s /path/to/your/vault/vimwiki_html ~/vimwiki_html
```

Now your wiki files are actually located in the encrypted vault in your cloud synced directory. Before accessing the 
files you always have to unlock your vault. Once the vault is unlocked, you can use *Vimwiki* normally.

## Final notes
So far I'm satisfied with described setup. The Cryptomator could be better and I would prefer a production ready 
CLI interface but it does its job well enough.

*Vimwiki* itself and its diary features seem really good in the brief time I have used them regularly. 
The idea of a diary and a personal wiki fascinate me as powerful tools to organize my knowledge but only time 
will tell if they actually work as I hope they will.
