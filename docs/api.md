## Modules

<dl>
<dt><a href="#module_TmLabs">TmLabs</a></dt>
<dd><p>SDK Available Globals.
Default export is Main TmLabs object class.</p>
</dd>
<dt><a href="#module_command">command</a></dt>
<dd><p>Commands module</p>
</dd>
<dt><a href="#module_constants.module_argument">argument</a></dt>
<dd><p>Endpoint specifications object</p>
</dd>
<dt><a href="#module_constants.module_endpoint">endpoint</a></dt>
<dd><p>Endpoint constants</p>
</dd>
<dt><a href="#module_error">error</a></dt>
<dd><p>SDK errors</p>
</dd>
<dt><a href="#module_constants.module_event">event</a></dt>
<dd><p>Event constants</p>
</dd>
<dt><a href="#module_constants">constants</a></dt>
<dd><p>SDK constants</p>
</dd>
<dt><a href="#module_specification">specification</a></dt>
<dd><p>Endpoint specifications object</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Account">Account</a></dt>
<dd></dd>
<dt><a href="#Command">Command</a> ⇐ <code><a href="#AbstractCommand">AbstractCommand</a></code></dt>
<dd></dd>
<dt><a href="#TmLabs">TmLabs</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
<dt><a href="#FetchCommand">FetchCommand</a> ⇐ <code><a href="#AbstractCommand">AbstractCommand</a></code></dt>
<dd></dd>
<dt><a href="#HashCommand">HashCommand</a> ⇐ <code><a href="#FetchCommand">FetchCommand</a></code></dt>
<dd></dd>
<dt><a href="#StatusCommand">StatusCommand</a> ⇐ <code><a href="#FetchCommand">FetchCommand</a></code></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#AbstractCommand">AbstractCommand</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>AbstractCommand main class which is parent for all commands</p>
</dd>
</dl>

<a name="module_TmLabs"></a>

## TmLabs
SDK Available Globals.
Default export is Main TmLabs object class.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TmLabs | [<code>TmLabs</code>](#TmLabs) | Main object TmLabs class |
| Command | [<code>Command</code>](#Command) | Main Command object class |
| Account | [<code>Account</code>](#Account) | Class for account |
| FetchCommand | [<code>FetchCommand</code>](#FetchCommand) | FetchCommand object class |
| HashCommand | [<code>HashCommand</code>](#HashCommand) | HashCommand object class |
| StatusCommand | [<code>StatusCommand</code>](#StatusCommand) | StatusCommand object class |

**Example**  
```js
// es6
// returns specific classes from package module
import { HashCommand as HashClass } from '@tempicolabs/tmlabs'

// or

var tmLabs = require('@tempicolabs/tmlabs');
var HashCommand = tmLabs.HashCommand;
```
**Example**  
```js
// in browser
<script src="dist/tmlabs.min.js"></script>
<script>
  var tmLabs = TmLabs.HashCommand();
</script>
```
**Example**  
```js
// es6
// returns default TmLabs main object class
import TmLabs from '@tempicolabs/tmlabs'

// or
var TmLabs = require('@tempicolabs/tmlabs');
var tmLabs = TmLabs.TmLabs();
//or
var tmLabs = TmLabs.default();
```
**Example**  
```js
// in browser
<script src="dist/tmlabs.min.js"></script>
<script>
  var tmLabs = TmLabs.default();
  //or
  var tmLabs2 = TmLabs.TmLabs();
</script>
```

* [TmLabs](#module_TmLabs)
    * [.fetch](#module_TmLabs.fetch) ⇒ <code>Promise</code>
    * [.hash](#module_TmLabs.hash) ⇒ <code>Promise</code>

<a name="module_TmLabs.fetch"></a>

### TmLabs.fetch ⇒ <code>Promise</code>
Simple fetch function.

**Kind**: static property of [<code>TmLabs</code>](#module_TmLabs)  
**Async**:   

| Param | Description |
| --- | --- |
| method |  |
| params | See options argument [fetch](#FetchCommand+fetch) |

**Example**  
```js
// es6
import { fetch } from '@tempicolabs/tmlabs'
fetch('ip', { ip: '8.8.8.8' }).then((ipData) => {
 console.log('Status data:', ipData);
});
```
<a name="module_TmLabs.hash"></a>

### TmLabs.hash ⇒ <code>Promise</code>
Simple hash function

**Kind**: static property of [<code>TmLabs</code>](#module_TmLabs)  
**Async**:   

| Param | Description |
| --- | --- |
| params | See options argument [run](#HashCommand+run) |

**Example**  
```js
// es6
import { hash } from '@tempicolabs/tmlabs'
hash({ hash: 'ff2178501f16e2c6ab435cfbabd45c90e7419c0e828d7da9d5c63acf016ba051' }).then((hashData) => {
 console.log('Hash data:', hashData);
});
```
<a name="module_command"></a>

## command
Commands module

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Fetch | [<code>FetchCommand</code>](#FetchCommand) | FetchCommand class |
| Hash | [<code>HashCommand</code>](#HashCommand) | HashCommand class |
| Status | [<code>StatusCommand</code>](#StatusCommand) | StatusCommand class |

<a name="module_constants.module_argument"></a>

## argument
Endpoint specifications object

**Read only**: true  
<a name="module_constants.module_endpoint"></a>

## endpoint
Endpoint constants

**Read only**: true  

* [endpoint](#module_constants.module_endpoint)
    * [~IP](#module_constants.module_endpoint..IP) : <code>string</code>
    * [~HASH](#module_constants.module_endpoint..HASH) : <code>string</code>
    * [~SCAN](#module_constants.module_endpoint..SCAN) : <code>string</code>
    * [~STATUS](#module_constants.module_endpoint..STATUS) : <code>string</code>
    * [~ACCOUNT_STATUS](#module_constants.module_endpoint..ACCOUNT_STATUS) : <code>string</code>
    * [~DNS](#module_constants.module_endpoint..DNS) : <code>string</code>
    * [~ME](#module_constants.module_endpoint..ME) : <code>string</code>
    * [~EMAIL_LEAKS](#module_constants.module_endpoint..EMAIL_LEAKS) : <code>string</code>

<a name="module_constants.module_endpoint..IP"></a>

### endpoint~IP : <code>string</code>
IP

**Kind**: inner constant of [<code>endpoint</code>](#module_constants.module_endpoint)  
**Default**: <code>&quot;ip&quot;</code>  
<a name="module_constants.module_endpoint..HASH"></a>

### endpoint~HASH : <code>string</code>
Hash

**Kind**: inner constant of [<code>endpoint</code>](#module_constants.module_endpoint)  
**Default**: <code>&quot;hash&quot;</code>  
<a name="module_constants.module_endpoint..SCAN"></a>

### endpoint~SCAN : <code>string</code>
Scan

**Kind**: inner constant of [<code>endpoint</code>](#module_constants.module_endpoint)  
**Default**: <code>&quot;scan&quot;</code>  
<a name="module_constants.module_endpoint..STATUS"></a>

### endpoint~STATUS : <code>string</code>
Status

**Kind**: inner constant of [<code>endpoint</code>](#module_constants.module_endpoint)  
**Default**: <code>&quot;status&quot;</code>  
<a name="module_constants.module_endpoint..ACCOUNT_STATUS"></a>

### endpoint~ACCOUNT_STATUS : <code>string</code>
Account Status

**Kind**: inner constant of [<code>endpoint</code>](#module_constants.module_endpoint)  
**Default**: <code>&quot;account/status&quot;</code>  
<a name="module_constants.module_endpoint..DNS"></a>

### endpoint~DNS : <code>string</code>
DNS

**Kind**: inner constant of [<code>endpoint</code>](#module_constants.module_endpoint)  
**Default**: <code>&quot;dns&quot;</code>  
<a name="module_constants.module_endpoint..ME"></a>

### endpoint~ME : <code>string</code>
Me. Data based on your ip address

**Kind**: inner constant of [<code>endpoint</code>](#module_constants.module_endpoint)  
**Default**: <code>&quot;me&quot;</code>  
<a name="module_constants.module_endpoint..EMAIL_LEAKS"></a>

### endpoint~EMAIL_LEAKS : <code>string</code>
Email Leaks

**Kind**: inner constant of [<code>endpoint</code>](#module_constants.module_endpoint)  
**Default**: <code>&quot;email/leaks&quot;</code>  
<a name="module_error"></a>

## error
SDK errors

**Example**  
```js
// Good way for handling errors created using TmLabs Object
var tmLabs = new TmLabs['default']();
tmLabs.on('error', function (error, command) {
  console.error('[ SDK ERROR ]', error)
});
tmLabs.fetch('ip', {
   ip: '127.0.0.1'
}).then(function(ipAnswer){
    console.log('ipAnswer', ipAnswer);
}).catch(function(err){
    console.log('error', err);
});
```

* [error](#module_error)
    * [~ResponseError](#module_error..ResponseError)
        * [new ResponseError()](#new_module_error..ResponseError_new)
    * [~NotFoundError](#module_error..NotFoundError)
        * [new NotFoundError()](#new_module_error..NotFoundError_new)
    * [~InsufficientFundsError](#module_error..InsufficientFundsError)
        * [new InsufficientFundsError()](#new_module_error..InsufficientFundsError_new)

<a name="module_error..ResponseError"></a>

### error~ResponseError
**Kind**: inner class of [<code>error</code>](#module_error)  
<a name="new_module_error..ResponseError_new"></a>

#### new ResponseError()
Response error

<a name="module_error..NotFoundError"></a>

### error~NotFoundError
**Kind**: inner class of [<code>error</code>](#module_error)  
<a name="new_module_error..NotFoundError_new"></a>

#### new NotFoundError()
Not found error

<a name="module_error..InsufficientFundsError"></a>

### error~InsufficientFundsError
**Kind**: inner class of [<code>error</code>](#module_error)  
<a name="new_module_error..InsufficientFundsError_new"></a>

#### new InsufficientFundsError()
Error for insufficient funds

<a name="module_constants.module_event"></a>

## event
Event constants

**Read only**: true  

* [event](#module_constants.module_event)
    * [~ERROR](#module_constants.module_event..ERROR) : <code>string</code>
    * [~FETCH](#module_constants.module_event..FETCH) : <code>string</code>
    * [~RAW_RESPONSE](#module_constants.module_event..RAW_RESPONSE) : <code>string</code>
    * [~RESPONSE](#module_constants.module_event..RESPONSE) : <code>string</code>
    * [~RESOLVED](#module_constants.module_event..RESOLVED) : <code>string</code>
    * [~COMMAND](#module_constants.module_event..COMMAND) : <code>string</code>
    * [~BALANCE_CHANGED](#module_constants.module_event..BALANCE_CHANGED) : <code>string</code>

<a name="module_constants.module_event..ERROR"></a>

### event~ERROR : <code>string</code>
Error

**Kind**: inner constant of [<code>event</code>](#module_constants.module_event)  
**Default**: <code>&quot;error&quot;</code>  
<a name="module_constants.module_event..FETCH"></a>

### event~FETCH : <code>string</code>
Fetch

**Kind**: inner constant of [<code>event</code>](#module_constants.module_event)  
**Default**: <code>&quot;fetch&quot;</code>  
<a name="module_constants.module_event..RAW_RESPONSE"></a>

### event~RAW_RESPONSE : <code>string</code>
Raw response

**Kind**: inner constant of [<code>event</code>](#module_constants.module_event)  
**Default**: <code>&quot;raw_response&quot;</code>  
<a name="module_constants.module_event..RESPONSE"></a>

### event~RESPONSE : <code>string</code>
Response

**Kind**: inner constant of [<code>event</code>](#module_constants.module_event)  
**Default**: <code>&quot;response&quot;</code>  
<a name="module_constants.module_event..RESOLVED"></a>

### event~RESOLVED : <code>string</code>
Resolved

**Kind**: inner constant of [<code>event</code>](#module_constants.module_event)  
**Default**: <code>&quot;response&quot;</code>  
<a name="module_constants.module_event..COMMAND"></a>

### event~COMMAND : <code>string</code>
Command

**Kind**: inner constant of [<code>event</code>](#module_constants.module_event)  
**Default**: <code>&quot;command&quot;</code>  
<a name="module_constants.module_event..BALANCE_CHANGED"></a>

### event~BALANCE_CHANGED : <code>string</code>
Balance change

**Kind**: inner constant of [<code>event</code>](#module_constants.module_event)  
**Default**: <code>&quot;balance_changed&quot;</code>  
<a name="module_constants"></a>

## constants
SDK constants

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| endpoint | <code>Object</code> | Endpoint constants |
| argument | <code>Object</code> | Endpoint arguments |
| specification | <code>Object</code> | Endpoint specifications |
| error | <code>Object</code> | SDK Errors |
| event | <code>Object</code> | SDK Events |

<a name="module_specification"></a>

## specification
Endpoint specifications object

**Read only**: true  
<a name="Account"></a>

## Account
**Kind**: global class  

* [Account](#Account)
    * [new Account(options)](#new_Account_new)
    * [.runCommand](#Account+runCommand) ⇒ <code>Promise</code>
    * [.getBalance](#Account+getBalance) ⇒ <code>Object</code>
    * [.balanceRemaining](#Account+balanceRemaining) ⇒ <code>double</code> \| <code>undefined</code>
    * [.getSubscriptions](#Account+getSubscriptions) ⇒ <code>null</code> \| <code>Object</code>
    * [.getStatus](#Account+getStatus) ⇒ <code>Object</code>
    * [.balanceLastBill](#Account+balanceLastBill) ⇒ <code>double</code> \| <code>undefined</code>
    * [.balanceReset](#Account+balanceReset) ⇒ <code>undefined</code> \| <code>double</code>

<a name="new_Account_new"></a>

### new Account(options)
Account for API requests


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options object |
| [options.key] | <code>String</code> | Token key |

<a name="Account+runCommand"></a>

### account.runCommand ⇒ <code>Promise</code>
Run command with params on behalf of this account

**Kind**: instance property of [<code>Account</code>](#Account)  
**Returns**: <code>Promise</code> - result  
**See**: [module:constants:event](module:constants:event)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| command | [<code>Command</code>](#Command) |  | Any command that inherits from `AbstractCommand` class |
| params | <code>Object</code> | <code>{}</code> | Params for [run](#Command+run) method specific for class |

<a name="Account+getBalance"></a>

### account.getBalance ⇒ <code>Object</code>
Get account balance by making new request

**Kind**: instance property of [<code>Account</code>](#Account)  
**Async**:   
**See**: [getStatus](#Account+getStatus)  
<a name="Account+balanceRemaining"></a>

### account.balanceRemaining ⇒ <code>double</code> \| <code>undefined</code>
Remaining balance

**Kind**: instance property of [<code>Account</code>](#Account)  
**See**: [balanceRemaining](#FetchCommand+balanceRemaining)  
<a name="Account+getSubscriptions"></a>

### account.getSubscriptions ⇒ <code>null</code> \| <code>Object</code>
Get account subscriptions by making new request

**Kind**: instance property of [<code>Account</code>](#Account)  
**Async**:   
**See**: [getStatus](#Account+getStatus)  
<a name="Account+getStatus"></a>

### account.getStatus ⇒ <code>Object</code>
Get account status by making new request

**Kind**: instance property of [<code>Account</code>](#Account)  
**Async**:   
**See**: [StatusCommand](#StatusCommand)  
<a name="Account+balanceLastBill"></a>

### account.balanceLastBill ⇒ <code>double</code> \| <code>undefined</code>
Last billing cost

**Kind**: instance property of [<code>Account</code>](#Account)  
**See**: [FetchCommand#balanceLastBill](FetchCommand#balanceLastBill)  
<a name="Account+balanceReset"></a>

### account.balanceReset ⇒ <code>undefined</code> \| <code>double</code>
Returns number of seconds before free key credits renew

**Kind**: instance property of [<code>Account</code>](#Account)  
**See**: [balanceReset](#FetchCommand+balanceReset)  
<a name="Command"></a>

## Command ⇐ [<code>AbstractCommand</code>](#AbstractCommand)
**Kind**: global class  
**Extends**: [<code>AbstractCommand</code>](#AbstractCommand)  

* [Command](#Command) ⇐ [<code>AbstractCommand</code>](#AbstractCommand)
    * [new Command(action, params)](#new_Command_new)
    * [.getClass](#Command+getClass) ⇒ [<code>FetchCommand</code>](#FetchCommand) \| [<code>StatusCommand</code>](#StatusCommand) \| [<code>HashCommand</code>](#HashCommand)
    * [.run](#Command+run)
    * [.class](#Command+class)
    * [.action](#AbstractCommand+action) : <code>String</code>
    * [.pending](#AbstractCommand+pending) : <code>Boolean</code>
    * [.params](#AbstractCommand+params) : <code>Array</code>

<a name="new_Command_new"></a>

### new Command(action, params)
Main Universal Command


| Param | Type | Description |
| --- | --- | --- |
| action | <code>String</code> | Action for the command |
| params | <code>Object</code> | Command parameters |

<a name="Command+getClass"></a>

### command.getClass ⇒ [<code>FetchCommand</code>](#FetchCommand) \| [<code>StatusCommand</code>](#StatusCommand) \| [<code>HashCommand</code>](#HashCommand)
Get Class by action name

**Kind**: instance property of [<code>Command</code>](#Command)  
**Throws**:

- ReferenceError


| Param | Type |
| --- | --- |
| [action] | <code>Boolean</code> \| <code>String</code> | 

<a name="Command+run"></a>

### command.run
Run command

**Kind**: instance property of [<code>Command</code>](#Command)  

| Param |
| --- |
| params | 

<a name="Command+class"></a>

### command.class
Get class of this command

**Kind**: instance property of [<code>Command</code>](#Command)  
**Read only**: true  
**See**: [getClass](#Command+getClass)  
<a name="AbstractCommand+action"></a>

### command.action : <code>String</code>
Command action

**Kind**: instance property of [<code>Command</code>](#Command)  
<a name="AbstractCommand+pending"></a>

### command.pending : <code>Boolean</code>
Pending status

**Kind**: instance property of [<code>Command</code>](#Command)  
<a name="AbstractCommand+params"></a>

### command.params : <code>Array</code>
Params

**Kind**: instance property of [<code>Command</code>](#Command)  
<a name="TmLabs"></a>

## TmLabs ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [TmLabs](#TmLabs) ⇐ <code>EventEmitter</code>
    * [new TmLabs([options])](#new_TmLabs_new)
    * [.account](#TmLabs+account) : [<code>Account</code>](#Account)
    * [.runBatch](#TmLabs+runBatch) ⇒ <code>Promise</code>
    * [.fetchBatch](#TmLabs+fetchBatch) ⇒ <code>Promise</code>
    * [.fetch](#TmLabs+fetch) ⇒ <code>Promise</code>
    * [.runCommand](#TmLabs+runCommand) ⇒ <code>Promise</code>
    * [.getSubscriptions](#TmLabs+getSubscriptions) ⇒ <code>Object</code> \| <code>null</code>
    * [.history](#TmLabs+history) ⇒ [<code>Array.&lt;AbstractCommand&gt;</code>](#AbstractCommand)
    * [.key](#TmLabs+key) ⇒ <code>string</code>
    * [.limit](#TmLabs+limit) ⇒ <code>number</code>
    * [.pending](#TmLabs+pending) ⇒ <code>number</code>
    * [.balanceRemaining](#TmLabs+balanceRemaining) ⇒ <code>double</code> \| <code>undefined</code>
    * [.balanceLastBill](#TmLabs+balanceLastBill) ⇒ <code>double</code> \| <code>undefined</code>
    * [.balanceReset](#TmLabs+balanceReset) ⇒ <code>undefined</code> \| <code>double</code>
    * [.version](#TmLabs+version) ⇒ <code>String</code>

<a name="new_TmLabs_new"></a>

### new TmLabs([options])
Main TmLabs class.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | The options object |
| [options.key] | <code>Object</code> | API token |
| [options.limit] | <code>Object</code> | Queue limit. Note: default is Infinity! |

<a name="TmLabs+account"></a>

### tmLabs.account : [<code>Account</code>](#Account)
Account

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
<a name="TmLabs+runBatch"></a>

### tmLabs.runBatch ⇒ <code>Promise</code>
Run commands

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
**Async**:   
**Resolves**: <code>Array.&lt;Object&gt;</code> result  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| commands | <code>Array.&lt;Object&gt;</code> |  | Array of command objects which contain command key and it params key for command run options |
| [options] | <code>Object</code> |  | Batch command options |
| [options.throw] | <code>Boolean</code> | <code>false</code> | If true command will throw exceptions |

<a name="TmLabs+fetchBatch"></a>

### tmLabs.fetchBatch ⇒ <code>Promise</code>
Fetch specific method multiple times with different params

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
**Async**:   
**Resolves**: <code>Array.&lt;Object&gt;</code> result  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | API method dns|ip, etc |
| objects | <code>Array.&lt;Object&gt;</code> | array of request parameters |
| options |  | additional options |

<a name="TmLabs+fetch"></a>

### tmLabs.fetch ⇒ <code>Promise</code>
Fetch specific method

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | API method dns|ip, etc |
| params | <code>object</code> | method parameters |

<a name="TmLabs+runCommand"></a>

### tmLabs.runCommand ⇒ <code>Promise</code>
Run command with params

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
**Returns**: <code>Promise</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| command | [<code>Command</code>](#Command) |  |
| params |  | command params |

<a name="TmLabs+getSubscriptions"></a>

### tmLabs.getSubscriptions ⇒ <code>Object</code> \| <code>null</code>
Get account subscriptions
Additional request required

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
<a name="TmLabs+history"></a>

### tmLabs.history ⇒ [<code>Array.&lt;AbstractCommand&gt;</code>](#AbstractCommand)
History array return

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
<a name="TmLabs+key"></a>

### tmLabs.key ⇒ <code>string</code>
Active token for TmLabs Object.
Overrides if passed into params of [FetchCommand Class](#FetchCommand) <code>key</code> or

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
<a name="TmLabs+limit"></a>

### tmLabs.limit ⇒ <code>number</code>
Get number of simultaneously requests

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
<a name="TmLabs+pending"></a>

### tmLabs.pending ⇒ <code>number</code>
Get number of pending requests

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
<a name="TmLabs+balanceRemaining"></a>

### tmLabs.balanceRemaining ⇒ <code>double</code> \| <code>undefined</code>
Remaining balance

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
**See**: [balanceRemaining](#Account+balanceRemaining)  
<a name="TmLabs+balanceLastBill"></a>

### tmLabs.balanceLastBill ⇒ <code>double</code> \| <code>undefined</code>
Last billing cost

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
**See**: [balanceLastBill](#Account+balanceLastBill)  
<a name="TmLabs+balanceReset"></a>

### tmLabs.balanceReset ⇒ <code>undefined</code> \| <code>double</code>
Returns number of seconds before free key credits renew

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
**See**: [balanceReset](#Account+balanceReset)  
<a name="TmLabs+version"></a>

### tmLabs.version ⇒ <code>String</code>
Returns SDK version

**Kind**: instance property of [<code>TmLabs</code>](#TmLabs)  
<a name="FetchCommand"></a>

## FetchCommand ⇐ [<code>AbstractCommand</code>](#AbstractCommand)
**Kind**: global class  
**Extends**: [<code>AbstractCommand</code>](#AbstractCommand)  

* [FetchCommand](#FetchCommand) ⇐ [<code>AbstractCommand</code>](#AbstractCommand)
    * [new FetchCommand(params)](#new_FetchCommand_new)
    * [.method](#FetchCommand+method) : <code>string</code>
    * [.run](#FetchCommand+run) ⇒ <code>Promise</code>
    * [.fetch](#FetchCommand+fetch) ⇒ <code>Promise</code>
    * [.headers](#FetchCommand+headers) : <code>Object</code> \| <code>undefined</code>
    * [.args](#FetchCommand+args) : <code>Array.&lt;Object&gt;</code>
    * [.rawArgs](#FetchCommand+rawArgs) : <code>Object</code>
    * [.content](#FetchCommand+content) : <code>Object</code>
    * [.error](#FetchCommand+error) : <code>Boolean</code>
    * [.status](#FetchCommand+status) ⇒ <code>number</code> \| <code>undefined</code>
    * [.statusText](#FetchCommand+statusText) ⇒ <code>String</code> \| <code>undefined</code>
    * [.errorText](#FetchCommand+errorText) ⇒ <code>String</code> \| <code>undefined</code>
    * [.balanceRemaining](#FetchCommand+balanceRemaining) : <code>double</code> \| <code>undefined</code>
    * [.balanceLastbill](#FetchCommand+balanceLastbill) : <code>double</code> \| <code>undefined</code>
    * [.balanceReset](#FetchCommand+balanceReset) : <code>double</code> \| <code>undefined</code>
    * [.pending](#FetchCommand+pending) : <code>Boolean</code>
    * [.url](#FetchCommand+url) : <code>String</code>
    * [.key](#FetchCommand+key) : <code>String</code>
    * [.getMethodSpecifications](#FetchCommand+getMethodSpecifications) ⇒ <code>Object</code> \| <code>Array.&lt;Object&gt;</code>
    * [.fetchClass](#FetchCommand+fetchClass) : <code>function</code>
    * [.action](#AbstractCommand+action) : <code>String</code>
    * [.params](#AbstractCommand+params) : <code>Array</code>

<a name="new_FetchCommand_new"></a>

### new FetchCommand(params)
FetchCommand for API requests

**Throws**:

- TypeError
- ReferenceError


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | The params object |
| [params.key] | <code>String</code> |  | Token key |
| params.method | <code>String</code> |  | Fetch method |
| [params.formatting] | <code>Boolean</code> | <code>true</code> | Enable JSON formatting (for better performance) |

<a name="FetchCommand+method"></a>

### fetchCommand.method : <code>string</code>
FetchCommand method

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Throws**:

- ReferenceError

<a name="FetchCommand+run"></a>

### fetchCommand.run ⇒ <code>Promise</code>
Run FetchCommand.
Options params can be found in [fetch method](#FetchCommand+fetch)

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | The options object |

<a name="FetchCommand+fetch"></a>

### fetchCommand.fetch ⇒ <code>Promise</code>
Fetch method

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Throws**:

- InsufficientFundsError
- NotFoundError
- ResponseError
- Error

**Async**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | The options object |
| [options.key] | <code>String</code> |  | Token key |
| [options.headers] | <code>Object</code> | <code>false</code> | Custom headers for request |
| [options.method] | <code>String</code> | <code>&#x27;GET&#x27;</code> | Custom method. e.g 'POST', 'GET' |

<a name="FetchCommand+headers"></a>

### fetchCommand.headers : <code>Object</code> \| <code>undefined</code>
Request headers

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+args"></a>

### fetchCommand.args : <code>Array.&lt;Object&gt;</code>
Filtered command arguments

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+rawArgs"></a>

### fetchCommand.rawArgs : <code>Object</code>
Filtered command arguments

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+content"></a>

### fetchCommand.content : <code>Object</code>
Request json encoded object

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+error"></a>

### fetchCommand.error : <code>Boolean</code>
Error occurred?

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+status"></a>

### fetchCommand.status ⇒ <code>number</code> \| <code>undefined</code>
Get status code.

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
**Example**  
```js
return 200
```
<a name="FetchCommand+statusText"></a>

### fetchCommand.statusText ⇒ <code>String</code> \| <code>undefined</code>
todo: fix
Get command request statusText. e.g 'OK', 'NOT FOUND' and etc.

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
**Example**  
```js
return 'OK'
```
<a name="FetchCommand+errorText"></a>

### fetchCommand.errorText ⇒ <code>String</code> \| <code>undefined</code>
Get command error text if error occurred

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+balanceRemaining"></a>

### fetchCommand.balanceRemaining : <code>double</code> \| <code>undefined</code>
Remaining balance

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+balanceLastbill"></a>

### fetchCommand.balanceLastbill : <code>double</code> \| <code>undefined</code>
Get last request cost

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+balanceReset"></a>

### fetchCommand.balanceReset : <code>double</code> \| <code>undefined</code>
Returns number of seconds before free key credits renew

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+pending"></a>

### fetchCommand.pending : <code>Boolean</code>
Is pending request or not

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Overrides**: [<code>pending</code>](#AbstractCommand+pending)  
**Read only**: true  
<a name="FetchCommand+url"></a>

### fetchCommand.url : <code>String</code>
Request url

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+key"></a>

### fetchCommand.key : <code>String</code>
Token key

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="FetchCommand+getMethodSpecifications"></a>

### fetchCommand.getMethodSpecifications ⇒ <code>Object</code> \| <code>Array.&lt;Object&gt;</code>
Get method specifications

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [method] | <code>String</code> \| <code>false</code> | <code>false</code> | if method defined get specifications for this method, else get all |

<a name="FetchCommand+fetchClass"></a>

### fetchCommand.fetchClass : <code>function</code>
Fetch class used in module, fetch-ponyfill

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
**Read only**: true  
<a name="AbstractCommand+action"></a>

### fetchCommand.action : <code>String</code>
Command action

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
<a name="AbstractCommand+params"></a>

### fetchCommand.params : <code>Array</code>
Params

**Kind**: instance property of [<code>FetchCommand</code>](#FetchCommand)  
<a name="HashCommand"></a>

## HashCommand ⇐ [<code>FetchCommand</code>](#FetchCommand)
**Kind**: global class  
**Extends**: [<code>FetchCommand</code>](#FetchCommand)  

* [HashCommand](#HashCommand) ⇐ [<code>FetchCommand</code>](#FetchCommand)
    * [new HashCommand([params])](#new_HashCommand_new)
    * [.options](#HashCommand+options) : <code>Object</code>
    * [.run](#HashCommand+run) ⇒ <code>Promise</code>
    * [.getStreamHash](#HashCommand+getStreamHash) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.hashStream](#HashCommand+hashStream) ⇒ <code>Stream</code>
    * [.getFileHash](#HashCommand+getFileHash) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getInputHash](#HashCommand+getInputHash) ⇒ <code>string</code>
    * [.method](#FetchCommand+method) : <code>string</code>
    * [.fetch](#FetchCommand+fetch) ⇒ <code>Promise</code>
    * [.headers](#FetchCommand+headers) : <code>Object</code> \| <code>undefined</code>
    * [.args](#FetchCommand+args) : <code>Array.&lt;Object&gt;</code>
    * [.rawArgs](#FetchCommand+rawArgs) : <code>Object</code>
    * [.content](#FetchCommand+content) : <code>Object</code>
    * [.error](#FetchCommand+error) : <code>Boolean</code>
    * [.status](#FetchCommand+status) ⇒ <code>number</code> \| <code>undefined</code>
    * [.statusText](#FetchCommand+statusText) ⇒ <code>String</code> \| <code>undefined</code>
    * [.errorText](#FetchCommand+errorText) ⇒ <code>String</code> \| <code>undefined</code>
    * [.balanceRemaining](#FetchCommand+balanceRemaining) : <code>double</code> \| <code>undefined</code>
    * [.balanceLastbill](#FetchCommand+balanceLastbill) : <code>double</code> \| <code>undefined</code>
    * [.balanceReset](#FetchCommand+balanceReset) : <code>double</code> \| <code>undefined</code>
    * [.pending](#FetchCommand+pending) : <code>Boolean</code>
    * [.url](#FetchCommand+url) : <code>String</code>
    * [.key](#FetchCommand+key) : <code>String</code>
    * [.getMethodSpecifications](#FetchCommand+getMethodSpecifications) ⇒ <code>Object</code> \| <code>Array.&lt;Object&gt;</code>
    * [.fetchClass](#FetchCommand+fetchClass) : <code>function</code>
    * [.action](#AbstractCommand+action) : <code>String</code>
    * [.params](#AbstractCommand+params) : <code>Array</code>

<a name="new_HashCommand_new"></a>

### new HashCommand([params])
HashCommand class for file & stream hashing.
Run method sends hash to API.
This class implements [Hasha](https://www.npmjs.com/package/hasha) for hashing functionality

**Throws**:

- TypeError


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [params] |  |  |  |
| [params.key] | <code>string</code> |  | API key. |
| [params.algorithm] | <code>string</code> | <code>&quot;sha256&quot;</code> | Algorithm used for hashing. Only `sha256` and `md5` are allowed |
| [params.encoding] | <code>string</code> | <code>&quot;hex&quot;</code> | Encoding of the returned hash. [Available values](https://www.npmjs.com/package/hasha#encoding) |

<a name="HashCommand+options"></a>

### hashCommand.options : <code>Object</code>
HashCommand options

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="HashCommand+run"></a>

### hashCommand.run ⇒ <code>Promise</code>
Get file or stream hash and check it by sending request to API

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Overrides**: [<code>run</code>](#FetchCommand+run)  
**Throws**:

- <code>InsufficientFundsError</code><code>TypeError</code> 

**Async**:   
**Fulfil**: <code>Object</code>  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| options |  | You can pass options used in [fetch](#FetchCommand+fetch) merged with options below |
| [options.hash] | <code>string</code> | Hash to check. |
| [options.stream] | <code>Stream</code> | Stream object. [hashStream](#HashCommand+hashStream) |
| [options.file] | <code>string</code> | The path to the file. [getFileHash](#HashCommand+getFileHash) |
| [options.input] | <code>Buffer</code> \| <code>string</code> \| <code>Array.&lt;Buffer&gt;</code> \| <code>Array.&lt;string&gt;</code> | Input for hashing. [getInputHash](#HashCommand+getInputHash) |

<a name="HashCommand+getStreamHash"></a>

### hashCommand.getStreamHash ⇒ <code>Promise.&lt;string&gt;</code>
Get hash passing stream as parameter.
*** NOTE: Can't use in browser

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  

| Param | Type | Description |
| --- | --- | --- |
| stream | <code>Stream</code> | Stream object |

<a name="HashCommand+hashStream"></a>

### hashCommand.hashStream ⇒ <code>Stream</code>
Get a hash transform stream.
*** NOTE: Can't use in browser

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**See**: [https://nodejs.org/api/crypto.html#crypto_class_hash](https://nodejs.org/api/crypto.html#crypto_class_hash)  
<a name="HashCommand+getFileHash"></a>

### hashCommand.getFileHash ⇒ <code>Promise.&lt;string&gt;</code>
Get hash passing only file path.
*** NOTE: Can't use in browser

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  

| Param | Type | Description |
| --- | --- | --- |
| filepath | <code>string</code> | The path to the file |

<a name="HashCommand+getInputHash"></a>

### hashCommand.getInputHash ⇒ <code>string</code>
Get hash.
Can be used in browser

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**See**: [https://www.npmjs.com/package/hasha#input](https://www.npmjs.com/package/hasha#input)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Buffer</code> \| <code>string</code> \| <code>Array.&lt;Buffer&gt;</code> \| <code>Array.&lt;string&gt;</code> | Input for hashing |

<a name="FetchCommand+method"></a>

### hashCommand.method : <code>string</code>
FetchCommand method

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Throws**:

- ReferenceError

<a name="FetchCommand+fetch"></a>

### hashCommand.fetch ⇒ <code>Promise</code>
Fetch method

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Throws**:

- InsufficientFundsError
- NotFoundError
- ResponseError
- Error

**Async**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | The options object |
| [options.key] | <code>String</code> |  | Token key |
| [options.headers] | <code>Object</code> | <code>false</code> | Custom headers for request |
| [options.method] | <code>String</code> | <code>&#x27;GET&#x27;</code> | Custom method. e.g 'POST', 'GET' |

<a name="FetchCommand+headers"></a>

### hashCommand.headers : <code>Object</code> \| <code>undefined</code>
Request headers

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+args"></a>

### hashCommand.args : <code>Array.&lt;Object&gt;</code>
Filtered command arguments

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+rawArgs"></a>

### hashCommand.rawArgs : <code>Object</code>
Filtered command arguments

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+content"></a>

### hashCommand.content : <code>Object</code>
Request json encoded object

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+error"></a>

### hashCommand.error : <code>Boolean</code>
Error occurred?

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+status"></a>

### hashCommand.status ⇒ <code>number</code> \| <code>undefined</code>
Get status code.

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
**Example**  
```js
return 200
```
<a name="FetchCommand+statusText"></a>

### hashCommand.statusText ⇒ <code>String</code> \| <code>undefined</code>
todo: fix
Get command request statusText. e.g 'OK', 'NOT FOUND' and etc.

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
**Example**  
```js
return 'OK'
```
<a name="FetchCommand+errorText"></a>

### hashCommand.errorText ⇒ <code>String</code> \| <code>undefined</code>
Get command error text if error occurred

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+balanceRemaining"></a>

### hashCommand.balanceRemaining : <code>double</code> \| <code>undefined</code>
Remaining balance

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+balanceLastbill"></a>

### hashCommand.balanceLastbill : <code>double</code> \| <code>undefined</code>
Get last request cost

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+balanceReset"></a>

### hashCommand.balanceReset : <code>double</code> \| <code>undefined</code>
Returns number of seconds before free key credits renew

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+pending"></a>

### hashCommand.pending : <code>Boolean</code>
Is pending request or not

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+url"></a>

### hashCommand.url : <code>String</code>
Request url

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+key"></a>

### hashCommand.key : <code>String</code>
Token key

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="FetchCommand+getMethodSpecifications"></a>

### hashCommand.getMethodSpecifications ⇒ <code>Object</code> \| <code>Array.&lt;Object&gt;</code>
Get method specifications

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [method] | <code>String</code> \| <code>false</code> | <code>false</code> | if method defined get specifications for this method, else get all |

<a name="FetchCommand+fetchClass"></a>

### hashCommand.fetchClass : <code>function</code>
Fetch class used in module, fetch-ponyfill

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
**Read only**: true  
<a name="AbstractCommand+action"></a>

### hashCommand.action : <code>String</code>
Command action

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
<a name="AbstractCommand+params"></a>

### hashCommand.params : <code>Array</code>
Params

**Kind**: instance property of [<code>HashCommand</code>](#HashCommand)  
<a name="StatusCommand"></a>

## StatusCommand ⇐ [<code>FetchCommand</code>](#FetchCommand)
**Kind**: global class  
**Extends**: [<code>FetchCommand</code>](#FetchCommand)  

* [StatusCommand](#StatusCommand) ⇐ [<code>FetchCommand</code>](#FetchCommand)
    * [new StatusCommand([params])](#new_StatusCommand_new)
    * [.run](#StatusCommand+run) ⇒ <code>Promise</code>
    * [.method](#FetchCommand+method) : <code>string</code>
    * [.fetch](#FetchCommand+fetch) ⇒ <code>Promise</code>
    * [.headers](#FetchCommand+headers) : <code>Object</code> \| <code>undefined</code>
    * [.args](#FetchCommand+args) : <code>Array.&lt;Object&gt;</code>
    * [.rawArgs](#FetchCommand+rawArgs) : <code>Object</code>
    * [.content](#FetchCommand+content) : <code>Object</code>
    * [.error](#FetchCommand+error) : <code>Boolean</code>
    * [.status](#FetchCommand+status) ⇒ <code>number</code> \| <code>undefined</code>
    * [.statusText](#FetchCommand+statusText) ⇒ <code>String</code> \| <code>undefined</code>
    * [.errorText](#FetchCommand+errorText) ⇒ <code>String</code> \| <code>undefined</code>
    * [.balanceRemaining](#FetchCommand+balanceRemaining) : <code>double</code> \| <code>undefined</code>
    * [.balanceLastbill](#FetchCommand+balanceLastbill) : <code>double</code> \| <code>undefined</code>
    * [.balanceReset](#FetchCommand+balanceReset) : <code>double</code> \| <code>undefined</code>
    * [.pending](#FetchCommand+pending) : <code>Boolean</code>
    * [.url](#FetchCommand+url) : <code>String</code>
    * [.key](#FetchCommand+key) : <code>String</code>
    * [.getMethodSpecifications](#FetchCommand+getMethodSpecifications) ⇒ <code>Object</code> \| <code>Array.&lt;Object&gt;</code>
    * [.fetchClass](#FetchCommand+fetchClass) : <code>function</code>
    * [.action](#AbstractCommand+action) : <code>String</code>
    * [.params](#AbstractCommand+params) : <code>Array</code>

<a name="new_StatusCommand_new"></a>

### new StatusCommand([params])
StatusCommand for getting status about yourself


| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>Object</code> \| <code>false</code> \| <code>undefined</code> | command params |

<a name="StatusCommand+run"></a>

### statusCommand.run ⇒ <code>Promise</code>
Return API status promise

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Overrides**: [<code>run</code>](#FetchCommand+run)  
**Async**:   

| Param |
| --- |
| options | 

<a name="FetchCommand+method"></a>

### statusCommand.method : <code>string</code>
FetchCommand method

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Throws**:

- ReferenceError

<a name="FetchCommand+fetch"></a>

### statusCommand.fetch ⇒ <code>Promise</code>
Fetch method

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Throws**:

- InsufficientFundsError
- NotFoundError
- ResponseError
- Error

**Async**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | The options object |
| [options.key] | <code>String</code> |  | Token key |
| [options.headers] | <code>Object</code> | <code>false</code> | Custom headers for request |
| [options.method] | <code>String</code> | <code>&#x27;GET&#x27;</code> | Custom method. e.g 'POST', 'GET' |

<a name="FetchCommand+headers"></a>

### statusCommand.headers : <code>Object</code> \| <code>undefined</code>
Request headers

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+args"></a>

### statusCommand.args : <code>Array.&lt;Object&gt;</code>
Filtered command arguments

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+rawArgs"></a>

### statusCommand.rawArgs : <code>Object</code>
Filtered command arguments

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+content"></a>

### statusCommand.content : <code>Object</code>
Request json encoded object

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+error"></a>

### statusCommand.error : <code>Boolean</code>
Error occurred?

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+status"></a>

### statusCommand.status ⇒ <code>number</code> \| <code>undefined</code>
Get status code.

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
**Example**  
```js
return 200
```
<a name="FetchCommand+statusText"></a>

### statusCommand.statusText ⇒ <code>String</code> \| <code>undefined</code>
todo: fix
Get command request statusText. e.g 'OK', 'NOT FOUND' and etc.

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
**Example**  
```js
return 'OK'
```
<a name="FetchCommand+errorText"></a>

### statusCommand.errorText ⇒ <code>String</code> \| <code>undefined</code>
Get command error text if error occurred

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+balanceRemaining"></a>

### statusCommand.balanceRemaining : <code>double</code> \| <code>undefined</code>
Remaining balance

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+balanceLastbill"></a>

### statusCommand.balanceLastbill : <code>double</code> \| <code>undefined</code>
Get last request cost

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+balanceReset"></a>

### statusCommand.balanceReset : <code>double</code> \| <code>undefined</code>
Returns number of seconds before free key credits renew

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+pending"></a>

### statusCommand.pending : <code>Boolean</code>
Is pending request or not

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+url"></a>

### statusCommand.url : <code>String</code>
Request url

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+key"></a>

### statusCommand.key : <code>String</code>
Token key

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="FetchCommand+getMethodSpecifications"></a>

### statusCommand.getMethodSpecifications ⇒ <code>Object</code> \| <code>Array.&lt;Object&gt;</code>
Get method specifications

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [method] | <code>String</code> \| <code>false</code> | <code>false</code> | if method defined get specifications for this method, else get all |

<a name="FetchCommand+fetchClass"></a>

### statusCommand.fetchClass : <code>function</code>
Fetch class used in module, fetch-ponyfill

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
**Read only**: true  
<a name="AbstractCommand+action"></a>

### statusCommand.action : <code>String</code>
Command action

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
<a name="AbstractCommand+params"></a>

### statusCommand.params : <code>Array</code>
Params

**Kind**: instance property of [<code>StatusCommand</code>](#StatusCommand)  
<a name="AbstractCommand"></a>

## *AbstractCommand ⇐ <code>EventEmitter</code>*
AbstractCommand main class which is parent for all commands

**Kind**: global abstract variable  
**Extends**: <code>EventEmitter</code>  
**Throws**:

- TypeError
- ReferenceError


| Param | Type | Description |
| --- | --- | --- |
| action | <code>String</code> | Action to be performed |
| params | <code>Object</code> | command params |


* *[AbstractCommand](#AbstractCommand) ⇐ <code>EventEmitter</code>*
    * *[.action](#AbstractCommand+action) : <code>String</code>*
    * *[.pending](#AbstractCommand+pending) : <code>Boolean</code>*
    * *[.params](#AbstractCommand+params) : <code>Array</code>*

<a name="AbstractCommand+action"></a>

### *abstractCommand.action : <code>String</code>*
Command action

**Kind**: instance property of [<code>AbstractCommand</code>](#AbstractCommand)  
<a name="AbstractCommand+pending"></a>

### *abstractCommand.pending : <code>Boolean</code>*
Pending status

**Kind**: instance property of [<code>AbstractCommand</code>](#AbstractCommand)  
<a name="AbstractCommand+params"></a>

### *abstractCommand.params : <code>Array</code>*
Params

**Kind**: instance property of [<code>AbstractCommand</code>](#AbstractCommand)  
