/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import { expect, assert } from 'chai';
import { Fetch as FetchCommand } from '../src/command';
import Command from '../src/Command';

describe('Commands Tests', () => {
  describe('Class Command', () => {
    it('init object with empty action. throw type error', () => {
      assert.throw(function () {
        new Command()
      }, ReferenceError, 'Empty action string argument');
    });
    it('init object with invalid action type. throw type error', () => {
      assert.throw(function () {
        new Command({})
      }, ReferenceError, 'Invalid action type');
    });
    it('init object with empty params. throw type error', () => {
      assert.throw(function () {
        new Command('asds')
      }, ReferenceError, 'Empty params object argument');
    });
    it('init object with invalid params type. throw type error', () => {
      assert.throw(function () {
        new Command('asds', 'test')
      }, ReferenceError, 'Invalid params type');
    });
    it('init object with empty options. throw type error', () => {
      assert.throw(function () {
        new Command('asds', {})
      }, ReferenceError, 'Empty params object');
    });
    it('init object with invalid action. throw type error', () => {
      assert.throw(function () {
        new Command('asds', {
          method: '',
        })
      }, ReferenceError, 'Action not found');
    });
    describe('Action FetchCommand', () => {
      it('init object with valid action and empty required param', () => {
        assert.throw(function () {
          new Command('fetch', {
            method: '',
          })
        }, TypeError, 'Empty required param \'method\'');
      });
      it('init object with valid action and invalid required param', () => {
        assert.throw(function () {
          new Command('fetch', {
            method: 'asd',
          })
        }, TypeError, 'Invalid method param');
      });
      it('init object with valid action and required params', () => {
        assert.doesNotThrow(() => {
          new Command('fetch', {})
        }, ReferenceError, 'Action not found');
        let command = new Command('fetch', {
          method: 'ip',
        });
        assert.instanceOf(command.instance, FetchCommand, 'command instance is an instance of FetchCommand');
      });
      it('do command without method required params', async () => {
        const command = new Command('fetch', {
          method: 'ip',
        });
        try {
          const ipResponse = await command.run();
        } catch(e) {
          assert.instanceOf(e, TypeError);
          assert.equal(e.message, 'Method required params not found', 'exception message');
        }
        assert.equal(command.status, undefined, 'no code');
        assert.equal(command.error, true, 'error=true');
      });
      it('do command for ip command. require params needed. throw error', async () => {
        const command = new Command('fetch', {
          method: 'ip',
        });
        try {
          const ipResponse = await command.run({});
        } catch(e) {
          assert.instanceOf(e, TypeError);
          assert.equal(e.message, 'Method required params not found', 'exception message');
        }
        assert.equal(command.status, undefined, 'no code');
        assert.equal(command.error, true, 'error=true');
      });
      it('do command for ip command. require params invalid type. throw error', async () => {
        const command = new Command('fetch', {
          method: 'ip',
        });
        try {
          const ipResponse = await command.run('some test string');
        } catch(e) {
          assert.instanceOf(e, TypeError);
          assert.equal(e.message, 'Method params should be an object', 'exception message');
        }
        assert.equal(command.status, undefined, 'no code');
        assert.equal(command.error, true, 'error=true');
      });
      it('do command. throw error for invalid params', async () => {
        const command = new Command('fetch', {
          method: 'ip',
        });
        try {
          const ipResponse = await command.run({
            ipfs: false, //invalid param
          });
        } catch(e) {
          assert.instanceOf(e, TypeError);
          assert.equal(e.message, 'Method required params not found', 'exception message');
        }
        assert.equal(command.status, undefined, 'code undefined');
        assert.equal(command.error, true, 'error=true');
      });
      it('do command. throw error for invalid required param', async () => {
        const command = new Command('fetch', {
          method: 'ip',
        });
        try {
          const ipResponse = await command.run({
            ip: false, //invalid param
          });
        } catch(e) {
          assert.instanceOf(e, TypeError);
          assert.equal(e.message, 'Method required param \'ip\' validation error', 'exception message');
        }
        assert.equal(command.status, undefined, 'code undefined');
        assert.equal(command.error, true, 'error=true');
      });
      it('do command. throw error for invalid required param validation', async () => {
        const command = new Command('fetch', {
          method: 'ip',
        });
        try {
          const ipResponse = await command.run({
            ip: 'some string', //invalid param. not ip!
          });
        } catch(e) {
          assert.instanceOf(e, TypeError);
          assert.equal(e.message, 'Method required param \'ip\' validation error', 'exception message');
        }
        assert.equal(command.status, undefined, 'code undefined');
        assert.equal(command.error, true, 'error=true');
      });
      it('do command. fetch ip data. error for bad ip', async () => {
        const command = new Command('fetch', {
          method: 'ip',
        });
        const ipResponse = await command.run({
          ip: '127.0.0.1',
        });
        assert.equal(command.status, 400, 'code 400');
        assert.equal(command.error, true, 'error=true');
        assert.deepEqual(command.args, [{
          "arg": "ip",
          "val": "127.0.0.1",
        }], 'arguments');
        assert.equal(command.url, 'https://tempicolabs.com/api/v2/ip/127.0.0.1/', 'correct url');
        assert.equal(command.statusText, 'BAD REQUEST');
        assert.equal(command.errorText, 'Incorrect IPv4 address', 'incorrect ipv4 address');
      });
      it('do command. fetch google ip data. using alias as require param', async () => {
        const command = new Command('fetch', {
          method: 'ip',
        });
        const ipResponse = await command.run({
          ipaddr: '173.194.122.233', // google ip address. using alias
        });
        assert.equal(command.status, 200, 'code 400');
        assert.equal(command.error, false, 'error=true');
        assert.deepEqual(command.args, [{
          "arg": "ipaddr",
          "val": "173.194.122.233",
        }], 'arguments');
        assert.equal(command.url, 'https://tempicolabs.com/api/v2/ip/173.194.122.233/', 'correct url');
        assert.equal(command.statusText, 'OK');
        assert.equal(command.errorText, undefined);
        assert.equal(command.content.isp, 'Google');
        // console.log(command.headers);
      });
    });
    describe('Action Status', () => {
      it('check balance properties', async () => {
        const command = new Command('status', false);
        const statusAnswer = await command.run();
        assert.equal(statusAnswer.status, 200, 'code 200');
        assert.hasAllKeys(statusAnswer.headers, [
          'balance_remaining', 'balance_lastbill', 'balance_reset',
        ], 'has balance keys in headers');
        assert.hasAllKeys(statusAnswer.content, [
          'balance', 'stats',
        ], 'has balance & stats keys in body');
        assert.hasAllKeys(statusAnswer.content.balance, [
          'reset', 'remaining',
        ], 'check balance object');
        assert.hasAllKeys(statusAnswer.content.stats, [
          'blacklisted', 'objects', 'queue'
        ], 'check stats object');
      });
    });
  });
  describe('Class FetchCommand', () => {
    it('init object with empty params', () => {
      assert.throw(function () {
        new FetchCommand()
      }, ReferenceError, 'Empty params object');
    });
  });
});
