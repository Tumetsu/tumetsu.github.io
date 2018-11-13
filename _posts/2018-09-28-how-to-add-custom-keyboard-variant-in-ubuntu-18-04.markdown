---
layout: post
title:  "How to add custom keyboard variant in Ubuntu 18.04"
date:   2018-09-28T11:23:27.244Z
categories: linux ubuntu

---

Recently I had to reinstall my Ubuntu and noticed I hadn't documented how to setup my custom keyboard layout. 
It took some time to figure it out so I decided to document it here for posteriority.
This should work on Ubuntu 18.04.

### 1. Customize your keyboard symbols
You should have a custom keyboard symbol definitions. In my case I wanted to replace the default Finnish
symbols to add a new keyboard variant called *sensible braces*. So
add a new variant to the default symbols file:
```
vim  /usr/share/X11/xkb/symbols/fi

partial alphanumeric_keys
xkb_symbols "sensiblebraces" {

    // Classic Finnish keyboard layout without dead keys and {[]} on asdf + AltGr

    include "fi(nodeadkeys)"

    name[Group1]="Finnish (classic, no dead keys, sensible braces)";

    key <AC01> { [  a,               A,                braceleft,             SCHWA                 ] };
    key <AC02> { [  s,               S,                bracketleft,           Scaron                ] };
    key <AC03> { [  d,               D,                bracketright,          ETH                   ] };
    key <AC04> { [  f,               F,                braceright,            F                     ] };
};
```

In my case I change the asdf to act as {[]} with Alt Gr as modifier. This setup makes those characters easier to
reach on Scandinavian keyboards.

### 2. Add the new variant to the evdev.xml
To get your new variant to show up in the desktop's keyboard selection GUI, you have to add the variant
to the evdev.xml:

```
vim /usr/share/X11/xkb/rules/evdev.xml

 <variant>
   <configItem>
     <name>sensiblebraces</name>
     <description>Finnish (classic, no dead keys, sensible braces)</description>
   </configItem>
 </variant>
```

Make sure to add the variant inside the correct layout definition!

### 3. Select the new layout
Simply select the new layout from the GUI keyboard layout menu. If it does not appear, try logging out first.
