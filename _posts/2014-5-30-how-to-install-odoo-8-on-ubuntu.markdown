---
layout: post
title:  "How to install Odoo 8 on Ubuntu"
date:   2014-5-30 15:31:52 +0200
categories: odoo guide python
---

This summer I’m working on a team where should build a web-service using [OpenERP or Odoo](https://www.odoo.com/) as it is known at the moment. Problem is that the rebranding of the framework and its quick development pace make it a bit difficult to find a proper documentation and many existing guides didn’t really work “as is”. Here I have documented the process of installation which worked for us for our development needs.

1. Install Ubuntu 14.04. We used an existing Vagrant-box from www.vagrantbox.es
2. From Odoo’s[ Github page](https://github.com/odoo/odoo), there was the following command which installed Odoo more or less automatically: `wget -O- https://raw.githubusercontent.com/odoo/odoo/master/odoo.py | python`
3. Install Postgres database:  `sudo apt-get install postgresql`
4. Create a postgres users:
`sudo su - postgres -c "createuser -s openerp" 2> /dev/null || true sudo su postgres -c "createuser -s <your_ubuntu_username_here>"`  (in Vagrant box the user will be "vagrant")
5. Install following packages which Odoo depends on:
```
sudo apt-get install graphviz ghostscript postgresql-client \ python-dateutil python-feedparser python-gdata \ python-ldap python-libxslt1 python-lxml python-mako \ python-openid python-psycopg2 python-pybabel python-pychart \ python-pydot python-pyparsing python-reportlab python-simplejson \ python-tz python-vatnumber python-vobject python-webdav \ python-werkzeug python-xlwt python-yaml python-imaging \ python-matplotlib
```
6. Go to odoo folder and try to run server with command
> ./openerp-server
7. Fix the errors by installing all the still missing modules with `sudo apt-get install python-[MISSING MODULE’S NAME]`. Sorry, I didn’t write the missing modules, but there should be only couple of them.
8. After installing and running the server again you should be able to view your site at:  [http://localhost:8069/](http://localhost:8069/)

You probably need to fiddle with things a bit but this is how we did it in the end. For more information and the source material we used to come up the solution can be found below:

* [Getting started installation](https://doc.openerp.com/trunk/server/01_getting_started/#getting-started-installation-source-link)
* [How to install Odoo from Github to Ubuntu 14.01 for testing purposes only](https://openerp.my.openerp.com/forum/Help-1/question/How-To-Install-Odoo-from-Github-on-Ubuntu-1404-For-Testing-Purposes-Only-ie-not-for-production-52627)

It’s probably worth to note that considering how fast things are changing, this solution might not work in the future. Hopefully Odoo’s Github page will get more detailed installation instructions in future.


