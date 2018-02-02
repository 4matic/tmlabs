/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import chai, { assert } from 'chai'
import chaiString from 'chai-string'
import TmLabs, { FetchCommand } from '../../dist/tmlabs.umd'

chai.use(chaiString)

const baseUrl = 'https://api.itsecurity.ee/v3'
const testIP = '173.194.122.233'

describe('UMD Bundle Tests', () => {
  it('Main class object initialization', () => {
    const tmLabs = new TmLabs()
    assert.isEmpty(tmLabs.history)
  })
  it('FetchCommand class object initialization. throw error', () => {
    assert.throw(() => {
      const command = new FetchCommand() // eslint-disable-line
    }, ReferenceError, 'Empty params object argument')
  })
  it('do command. fetch google ip data. using alias as require param', async () => {
    const command = new FetchCommand({
      method: 'ip'
    })
    await command.run({
      ipaddr: testIP // google ip address. using alias
    })
    assert.equal(command.status, 200, 'code 400')
    assert.equal(command.error, false, 'error=false')
    assert.deepEqual(command.args, [{
      'arg': 'ipaddr',
      'val': testIP
    }], 'arguments')
    assert.startsWith(command.url, `${baseUrl}/ip/${testIP}/`, 'correct url')
    assert.equal(command.statusText, 'OK')
    assert.equal(command.errorText, undefined)
    assert.equal(command.content.isp, 'Google')
  })
})
