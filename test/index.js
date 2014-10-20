'use strict';

var test = require('tape');
var lamer = require('..');

test(function (t) {
  var client = lamer.createClient({ api: 'http://www.echojs.com' });

  client.login({
    username: 'lamernews-client-test',
    password: 'lamernews-client-test'
  }, logged);

  function logged (err) {
    if (err) {
      done(err); return;
    }
    client.submit({
      title: 'testing!',
      url: 'https://github.com/bevacqua/lamernews-client'
    }, done);
  }

  function done (err) {
    console.log(err);
    t.end();
  }
});

test(function (t) {
  var client = lamer.createClient({ api: 'http://www.echojs.com' });

  client.list({}, listed);

  function listed (err, body) {
    console.log(err, body);
    t.end();
  }
});
