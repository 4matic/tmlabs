/* eslint-env mocha */

import { assert } from 'chai'
import { fetch } from '../src/index'

describe('Function Tests', () => {
  describe('method fetch', () => {
    it('no arguments', async () => {
      try {
        await fetch()
      } catch (e) {
        assert.instanceOf(e, TypeError)
        assert.equal(e.message, 'Empty required param \'method\'', 'exception message')
      }
    })
    it('Google DNS ip checking', async () => {
      const answer = await fetch('ip', { ipaddr: '8.8.8.8' })
      assert.equal(answer.status, 200, 'code 400')
      assert.equal(answer.error, false, 'error=false')
      assert.equal(answer.statusText, 'OK')
      assert.equal(answer.errorText, undefined)
      assert.equal(answer.content.isp, 'Google')
    })
  })
})
