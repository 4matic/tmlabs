const TmLabs = require('@tempicolabs/tmlabs')
const tmLabs = new TmLabs['default']() // new TmLabs object instance

// Event handlers
tmLabs.on('error', function (error, command) {
  console.error('[ SDK ERROR ]', error)
})
tmLabs.on('response', function (command, response) {
  console.info('Command response content', response.content)
  console.log(`balanceRemaining: ${command.balanceRemaining}`) // return Remaining Balance
})
tmLabs.on('command', function (command, args) {
  console.log(`[ command method '${command.method}' start ]. history size: ${tmLabs.history.length}`) // get array of one completed commands
})

// API Requests
const dnsAnswer = await tmLabs.fetch('dns', { // wanna get google.com ip address
  domain: 'google.com'
});
const ip = dnsAnswer.content[Object.keys(dnsAnswer.content)[0]] // because response will be in 'google.com' key

console.info(`[ GOOGLE IP ADDRESS ]: ${ip}`) // get info about google ip address
const ipAnswer = await tmLabs.fetch('ip', {
  ip: ip
});
console.info('[ GOOGLE IP INFO ]', ipAnswer.content) // get info about google ip address

// Also can do multiple commands
// for example dns command
const domains = ['google.com', 'facebook.com', 'ibm.com', 'example.com', 'assadasf', '127.0.0.1'].map(function (domain) { // make the right structure for fetchBatch function
  return {
    domain: domain
  }
});

const batchAnswer = await tmLabs.fetchBatch('dns', domains, { throw: false });
console.log(`[ RESPONSES ]: ${batchAnswer.length}`);
console.log(batchAnswer);
console.log(`History after DNS command batch. history size: ${tmLabs.history.length}`);
