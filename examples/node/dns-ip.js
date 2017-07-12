const TmLabs = require('../../dist/tmlabs.umd')
console.log('TmLabs', TmLabs);
var tmLabs = new TmLabs.default()
tmLabs.on('error', function (error, command) {
  console.error('[ SDK ERROR ]', error)
})
tmLabs.on('response', function (command, response) {
  console.info('response', response)
  console.log('balanceRemaining', command.balanceRemaining) // return Remaining Balance
})
tmLabs.on('command', function (args, command) {
  console.log('history', tmLabs.history) // get array of one completed commands
})
tmLabs.fetch('dns', {
  domain: 'google.com'
}).then(function (answer) {
  var ip = answer.content[Object.keys(answer.content)[0]]// because response will be in 'google.com' key
  console.log('History after DNS command', tmLabs.history) // get array of one completed command
  return tmLabs.fetch('ip', {
    ip: ip
  })
}).then(function (answer) {
  console.info('google ip info', answer.content) // get info about google ip address
  console.log('History after IP command', tmLabs.history) // get array of two completed commands
})
console.log('History with pending requests', tmLabs.history) // get array of two pending commands
