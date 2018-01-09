<h1 align="center">
  <br>
  <a href="https://tempicolabs.com"><img src="https://www.tempicolabs.com/img/logo_tl_H_black.png" alt="TempicoLabs" width="400"></a>
  <br>
  Tempico Labs SDK
  <br>
  <br>
</h1>

<h4 align="center">Tempico Labs SDK for API. For node.js and the web.</h4>

<p align="center">
  <img src="https://img.shields.io/bower/v/tmlabs.svg" alt="Bower version">
  <a href="https://www.npmjs.com/package/@tempicolabs/tmlabs">
    <img src="https://img.shields.io/npm/v/@tempicolabs/tmlabs.svg" alt="Npm version">
  </a>
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code/style-standard-brightgreen.svg" alt="Javascript Standart Style">
  </a>
  <a href="https://github.com/TempicoLabs/tmlabs/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/TempicoLabs/tmlabs.svg" alt="Github Licence">
  </a>
  <a href="https://docs.tempicolabs.com/">
    <img src="https://img.shields.io/badge/docs-postman-orange.svg" alt="Postman Documentation">
  </a>
  <a href="https://runkit.com/4matic/get-started-with-tmlabs">
    <img src="https://img.shields.io/badge/guide-%40runkit-brightgreen.svg" alt="SDK Usage Guide">
  </a>
  <a href="https://npm.runkit.com/@tempicolabs/tmlabs">
      <img src="https://badge.runkitcdn.com/@tempicolabs/tmlabs.svg" alt="Try @tempicolabs/tmlabs on RunKit"/>
  </a>
</p>
<br>

**TmLabs** is a SDK for [TempicoLabs API](https://www.tempicolabs.com/index.t3m#api-description) using in **node.js** and the **browser**.
It is written in clean ES6 Javascript. 

### Install

To install TmLabs for use in node or the browser with `require('@tempicolabs/tmlabs')`, run:

```bash
npm i @tempicolabs/tmlabs --save
```

Or alternatively using Bower, run:

```bash
bower install tmlabs --save
```

#### SDK contain:

`dist/tmlabs.umd.js` - Standard package for node.js

`dist/tmlabs.es.js` - ES6 Package for node.js using import

`dist/tmlabs.js` - Unminified browser version

`dist/tmlabs.min.js` - Minified browser version

`src/*` - Sources. Javascript ES2016

### TmLabs API Documentation

**[Read SDK Documentation](docs/api.md).**

**[Read the full API Documentation](https://docs.tempicolabs.com/).**

### Usage

**[Read Usage Guide](https://runkit.com/4matic/get-started-with-tmlabs).**

TmLabs is the wrapper for API. It uses [fetch-ponyfill](https://github.com/qubyte/fetch-ponyfill) for HTTP requests.


#### In the browser

```html
<script src="./dist/tmlabs.min.js"></script>
<script>
    var TmLabs = new TmLabs.default(); // or new TmLabs.TmLabs()
    TmLabs.on('error', function(error, command){
      console.error('[ SDK ERROR ]', error);
    });
    TmLabs.on('response', function(command, response){
      console.info('response', response);
      console.log('balanceRemaining', command.balanceRemaining); // return Remaining Balance
    });
    TmLabs.on('command', function(args, command){ // on command start 
      console.log('command', command)
    });
    TmLabs.fetch('dns', {
      domain: 'google.com'
    }).then(function(answer){
      var ip = answer.content[Object.keys(answer.content)[0]];// because response will be in 'google.com' key
      console.log('History after DNS command', TmLabs.history) // get array of one completed command
      return TmLabs.fetch('ip', {
        ip: ip
      })
    }).then(function(answer){
      console.info('google ip info', answer.content) // get info about google ip address
      console.log('History after IP command', TmLabs.history) // get array of two completed commands
    });
    console.log('History with pending requests', TmLabs.history) // get array of two pending commands
</script>
```

#### In Node.js

TmLabs also works in node.js, using the *same npm package!*

```javascript
  var TmLabs = require('@tempicolabs/tmlabs').default
  
  TmLabs.on('error', function (error, command) {
    console.error(error);
  });
  TmLabs.on('response', function (response, command) {
    console.log('response', response);
    console.log('balanceRemaining', command.balanceRemaining); // return Remaining Balance
  });
  TmLabs.fetch('dns', {
    domain: 'google.com'
  }).then(function (response) {
    console.log('after then response', response)
  })
```
** You can use bundled version in `dist/tmlabs.umd.js`

Package also contain FetchCommand Class for customizing fetch data from API.
For example in ES6:

```javascript
  import { FetchCommand } from '@tempicolabs/tmlabs'
  
  const command = new FetchCommand({
    method: 'ip'
  })
  command.on('error', (error, command) => {
    console.error(error);
  });
  command.on('response', (response, command) => {
    console.log('response object', response);
    console.log('response code', command.status); // same as response.status. return status code, for example 200
  });
  const response = await command.run({ // this response also goes to command.on('response') EventHandler if no error exists
    ipaddr: '173.194.122.233' // google ip address. using alias(ipaddr)
  })
  console.log(response) // API response. same as command.content
```
** You can use bundled version in `dist/tmlabs.es.js` for ES6

##### More examples you can find in [examples directory](examples)

### License

MIT. Copyright (c) [Maxim Maximov](http://4matikku.com) and [TempicoLabs, LLC](https://tempicolabs.com).
