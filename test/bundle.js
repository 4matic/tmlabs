/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import chai, { assert } from 'chai'
import chaiString from 'chai-string'
import TmLabs, { FetchCommand } from '../dist/tmlabs.umd'

chai.use(chaiString)

describe('Bundle Tests', () => {
  it('Main class object initialization', () => {
    const tmLabs = new TmLabs()
    console.log('TmLabs', tmLabs)
    assert.isEmpty(tmLabs.history)
  })
  it('FetchCommand class object initialization. throw error', () => {
    assert.throw(() => {
      const command = new FetchCommand()
    }, ReferenceError, 'Empty params object argument')
  })
  it('do command. fetch google ip data. using alias as require param', async () => {
    const command = new FetchCommand({
      method: 'ip'
    })
    await command.run({
      ipaddr: '173.194.122.233' // google ip address. using alias
    })
    assert.equal(command.status, 200, 'code 400')
    assert.equal(command.error, false, 'error=false')
    assert.deepEqual(command.args, [{
      'arg': 'ipaddr',
      'val': '173.194.122.233'
    }], 'arguments')
    assert.startsWith(command.url, 'https://tempicolabs.com/api/v2/ip/173.194.122.233/', 'correct url')
    assert.equal(command.statusText, 'OK')
    assert.equal(command.errorText, undefined)
    assert.equal(command.content.isp, 'Google')
  })
})
