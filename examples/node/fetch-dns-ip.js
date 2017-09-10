var TmLabs = require('../../dist/tmlabs.umd')
/* eslint-disable new-cap */
var tmLabs = new TmLabs['default']()
tmLabs.on('error', function (error, command) {
  console.error('[ SDK ERROR ]', error)
})
tmLabs.on('response', function (command, response) {
  console.info('!!! response content', response.content)
  console.log('balanceRemaining', command.balanceRemaining) // return Remaining Balance
})
tmLabs.on('command', function (command, args) {
  console.log(`[ command method '${command.method}' start ]. history size: `, tmLabs.history.length) // get array of one completed commands
})
tmLabs.fetch('dns', { // wanna get google.com ip address
  domain: 'google.com'
}).then(function (answer) {
  var ip = answer.content[Object.keys(answer.content)[0]]// because response will be in 'google.com' key
  console.log('History after DNS command. history size: ', tmLabs.history.length) // get array of one completed command
  return tmLabs.fetch('ip', {
    ip: ip
  })
}).then(function (answer) {
  console.info('[ GOOGLE IP INFO ]', answer.content) // get info about google ip address
  console.log('History after IP command. history size: ', tmLabs.history.length) // get array of two completed commands
})
console.log('History with pending requests. history size: ', tmLabs.history.length) // get array of two pending commands
