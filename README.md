Couch Admin Tools
=================

Author: Miles Pomeroy

A collection of tools for administering CouchDB from within CouchDB.

Installation
------------

1. Requires [node.couchapp.js](https://github.com/mikeal/node.couchapp.js) to be
   installed globally for installing code to the database.
1. Create new database in your CouchDB instance (make sure it doesn't exist first).

        PUT /admin

1. Download the latest code.

        git clone git://github.com/milespomeroy/couch-admin-tools.git

1. Use couchapp to install the code into the new database.

        cd couch-admin-tools
        couchapp push app.js http://user:password@localhost:5984/admin

Couch Console
-------------

![console screenshot](https://github.com/milespomeroy/couch-admin-tools/raw/master/console-screenshot.png)

Simple HTTP client. Useful for running ad-hoc requests.

<http://localhost:5984/admin/_design/app/console.html>

