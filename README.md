# lamernews-client

> A simple Node.js client to the LamerNews API

# Installation

```shell
npm i -S lamernews-client
```

# Usage

The example shown below will post some news to a LamerNews-powered site.

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
  }, done);
}

function done (err) {
  console.log(err);
  t.end();
}
```

# License

MIT
