var TmLabs = require('../../dist/tmlabs.umd')
var fs = require('fs')
/* eslint-disable new-cap */
var tmLabs = new TmLabs['default']({
  limit: 2
})
var pendingTimerId = setInterval(function () { // timer for checking pending requests
  console.log('[ PENDING REQUESTS: ]', tmLabs.pending)
}, 300)

tmLabs.on('error', function (error, command) {
  console.error("[ ERROR '" + command.method + "' ]", error.message)
})
tmLabs.on('response', function (command, response) {
  console.info("[ RESPONSE '" + command.method + "' ]", response.content)
  console.log('[ BALANCE ]', tmLabs.balanceRemaining) // return Remaining Balance
})
tmLabs.on('command', function (command, args) {
  console.log("[ COMMAND '" + command.method + "' ] history size: ", tmLabs.history.length, ', pending: ', tmLabs.pending)
})
tmLabs.on('resolved', function (command, args) {
  console.log("[ RESOLVED '" + command.method + "' ] history size: ", tmLabs.history.length, ', pending: ', tmLabs.pending)
})

const commands = [[new TmLabs.HashCommand(), {
  hash: 'testing hash'
}], [new TmLabs.HashCommand(), {
  hash: 'ff2178501f16e2c6ab435cfbabd45c90e7419c0e828d7da9d5c63acf016ba051' // just check hash
}], [new TmLabs.HashCommand(), {
  file: 'bower.json' // file name
}], [new TmLabs.HashCommand(), {
  file: 'fetch-dns-ip.js' // file name
}], [new TmLabs.HashCommand(), {
  string: 'some string ' // hash string
}], [new TmLabs.HashCommand(), {
  stream: fs.createReadStream('fetch-dns-batch.js') // stream
}]]
tmLabs.runBatch(commands.map(command => ({
  command: command[0],
  params: command[1]
}))).then(function (responses) {
  console.log('[ RESPONSES ]', responses.length)
  console.log('History after DNS command batch. history size: ', tmLabs.history.length)
  clearInterval(pendingTimerId)
})
