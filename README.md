<h1 align="center">
  <br>
  <a href="https://tempicolabs.com"><img src="https://www.tempicolabs.com/img/logo_tl_H_black.png" alt="TempicoLabs" width="400"></a>
  <br>
  TmLabs SDK
  <br>
  <br>
</h1>

<h4 align="center">Tempico Labs SDK for API. For node.js and the web.</h4>

<p align="center">
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="js-standard-style"></a>
</p>
<br>

**TmLabs** is a SDK for [TempicoLabs API](https://www.tempicolabs.com/index.t3m#api-description) using in **node.js** and the **browser**.
It is written in clean ES6 Javascript.

### Install

To install TmLabs for use in node or the browser with `require('tmlabs')`, run:

```bash
npm install tmlabs
```

To install a `tmlabs` [command line program](https://github.com/TempicoLabs/tmlabs-cli), run:

```bash
npm install tmlabs-cli -g
```

### TmLabs API Documentation

**[Read SDK Documentation](docs/api.md).**

**[Read the full API Documentation](https://www.tempicolabs.com/documentation.t3m).**

### Usage

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
  import TmLabs from 'tmlabs'
  
  TmLabs.on('error', (error, command) => {
    console.error(error);
  });
  TmLabs.on('response', (response, command) => {
    console.log('response', response);
    console.log('balanceRemaining', command.balanceRemaining); // return Remaining Balance
  });
  TmLabs.fetch('dns', {
    domain: 'google.com'
  });
```
** You can use bundled version in `dist/tmlabs.umd.js`

Package also contain FetchCommand Class for customizing fetch data from API.
For example in ES6:

```javascript
  import { FetchCommand } from 'tmlabs'
  
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

#### As a command line app

TmLabs is also available as a [command line app](https://github.com/TempicoLabs/tmlabs-cli). Here's how to use it:

```bash
$ npm install tmlabs-cli -g
$ tmlabs --help
```

### License

MIT. Copyright (c) [Maxim Maximov](http://4matikku.com) and [TempicoLabs, LLC](https://tempicolabs.com).
