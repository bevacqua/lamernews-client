# lamernews-client

> A simple Node.js client to the LamerNews API

# Installation

```shell
npm i -S lamernews-client
```

# Usage

The example shown below will post some news to a LamerNews-powered site, and remove them afterwards.

```js
var lamer = require('lamernews-client');
var client = lamer.createClient({ api: 'http://www.echojs.com' });

client.login({
  username: '{{username}}',
  password: '{{password}}'
}, logged);

function logged () {
  client.submit({
    title: 'testing lamernews-client!',
    url: 'https://github.com/bevacqua/lamernews-client'
  }, remove);
}

function remove (err, data) {
  client.remove(data, done);
}

function done (err) {
  t.end();
}
```

Just want a list of new articles posted on EchoJS?

```js
var lamer = require('lamernews-client');
var client = lamer.createClient({ api: 'http://www.echojs.com' });

client.list({}, listed);

function listed (err, body) {
  console.log(err, body);
  t.end();
}
```

# License

MIT
