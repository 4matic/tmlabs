/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import { assert } from 'chai'
import TmLabs from '../src/index'

describe('Class Tests', () => {
  describe('Main class object initialization', () => {
    it('Empty constructor', () => {
      const tmLabs = new TmLabs()
      assert.isEmpty(tmLabs.history)
    })
  })
})
