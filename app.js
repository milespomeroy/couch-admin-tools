var couchapp = require('couchapp');
var path = require('path');

ddoc = {
  _id: '_design/app',
  shows: {}
};

module.exports = ddoc;

ddoc.shows.test = function (doc, req) {
  return "<h1>Foo</h1> <p>Hello World!</p>";
};

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'));
