/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import { assert } from 'chai'
import TmLabs from '../src/index'
import Command from '../src/Command'
import {
  Status,
  Fetch,
  Hash
} from '../src/command'

describe('Class Tests', () => {
  it('Empty constructor', () => {
    const tmLabs = new TmLabs()
    assert.isEmpty(tmLabs.history)
  })
  it('Multiple requests. domain requests. throw error for invalid domains', async () => {
    const tmLabs = new TmLabs()
    const domains = ['google.com', 'facebook.com', 'ibm.com', 'example.com', 'assadasf', '127.0.0.1']
    let results
    try {
      results = await tmLabs.fetchBatch('dns', domains.map(domain => ({
        domain: domain
      })), {throw: true})
    } catch (e) {
      assert.isUndefined(results)
      assert.equal(e.message, 'Method required param \'domain\' validation error', 'exception message')
    }
  })
  it('Multiple requests. domain requests. invalid domains error in result array', async () => {
    const tmLabs = new TmLabs()
    const domains = ['google.com', 'facebook.com', 'ibm.com', 'example.com', 'assadasf', '127.0.0.1']
    const results = await tmLabs.fetchBatch('dns', domains.map(domain => ({
      domain: domain
    })))
    assert.lengthOf(results, 6)
  })
  it('Multiple commands. fetch commands. error in results array', async () => {
    const tmLabs = new TmLabs()
    const commands = [[new Fetch({
      method: 'ip'
    }), {
      ip: '127.0.0.1'
    }], [new Fetch({
      method: 'ip'
    }), {
      ip: '173.194.122.233'
    }], [new Command('fetch', {
      method: 'ip'
    }), {
      ip: '173.194.122.234'
    }]]
    const results = await tmLabs.runBatch(commands.map(command => ({
      command: command[0],
      params: command[1]
    })))
    assert.lengthOf(results, 3)
    assert.equal(results[0].state, 'rejected')
    assert.instanceOf(results[0].reason, Error)
  })
  it('Multiple commands. fetch commands. error in results array', async () => {
    const tmLabs = new TmLabs()
    let results
    const commands = [[new Fetch({
      method: 'ip'
    }), {
      ip: '127.0.0.1'
    }], [new Fetch({
      method: 'ip'
    }), {
      ip: '173.194.122.233'
    }], [new Command('fetch', {
      method: 'ip'
    }), {
      ip: '173.194.122.234'
    }]]
    try {
      results = await tmLabs.runBatch(commands.map(command => ({
        command: command[0],
        params: command[1]
      })), { throw: true })
    } catch (e) {
      assert.isUndefined(results)
      assert.equal(e.message, 'Incorrect IPv4 address', 'exception message')
    }
  })
  it('Multiple commands. hash & fetch commands. error in results array', async () => {
    const tmLabs = new TmLabs()
    const commands = [[new Hash(), {
      hash: 'testing hash'
    }], [new Fetch({
      method: 'ip'
    }), {
      ip: '173.194.122.233'
    }], [new Command('fetch', {
      method: 'ip'
    }), {
      ip: '173.194.122.234'
    }], [new Hash(), {
      hash: 'ff2178501f16e2c6ab435cfbabd45c90e7419c0e828d7da9d5c63acf016ba051'
    }], [new Hash(), {
      file: 'bower.json'
    }], [new Status(), false]]
    const results = await tmLabs.runBatch(commands.map(command => ({
      command: command[0],
      params: command[1]
    })))
    assert.lengthOf(results, 6)
    assert.equal(results[0].state, 'rejected')
    assert.instanceOf(results[0].reason, Error)
    assert.equal(results[5].state, 'fulfilled')
    assert.hasAllKeys(results[5].value.content, [
      'balance', 'stats'
    ], 'has balance & stats keys in body')
  })
})
