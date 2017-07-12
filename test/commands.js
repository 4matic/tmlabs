/* eslint-env mocha */
/* eslint-disable no-new */

import chai, { assert } from 'chai'
import chaiString from 'chai-string'
import { Fetch as FetchCommand } from '../src/command'
import Command from '../src/Command'

chai.use(chaiString)

describe('Commands Tests', () => {
  describe('Class Command', () => {
    it('init object with empty action. throw type error', () => {
      assert.throw(() => {
        new Command()
      }, ReferenceError, 'Empty action string argument')
    })
    it('init object with invalid action type. throw type error', () => {
      assert.throw(() => {
        new Command({})
      }, ReferenceError, 'Invalid action type')
    })
    it('init object with empty params. throw type error', () => {
      assert.throw(() => {
        new Command('asds')
      }, ReferenceError, 'Empty params object argument')
    })
    it('init object with invalid params type. throw type error', () => {
      assert.throw(() => {
        new Command('asds', 'test')
      }, ReferenceError, 'Invalid params type')
    })
    it('init object with empty options. throw type error', () => {
      assert.throw(() => {
        new Command('asds', {})
      }, ReferenceError, 'Empty params object')
    })
    it('init object with invalid action. throw type error', () => {
      assert.throw(() => {
        new Command('asds', {
          method: ''
        })
      }, ReferenceError, 'Action not found')
    })
    describe('Action FetchCommand', () => {
      it('init object with valid action and empty required param', () => {
        assert.throw(() => {
          new Command('fetch', {
            method: ''
          })
        }, TypeError, 'Empty required param \'method\'')
      })
      it('init object with valid action and invalid required param', () => {
        assert.throw(() => {
          new Command('fetch', {
            method: 'asd'
          })
        }, TypeError, 'Invalid method param')
      })
      it('init object with valid action and required params', () => {
        assert.doesNotThrow(() => {
          new Command('fetch', {})
        }, ReferenceError, 'Action not found')
        let command = new Command('fetch', {
          method: 'ip'
        })
        assert.instanceOf(command.instance, FetchCommand, 'command instance is an instance of FetchCommand')
      })
      it('do command without method required params', async () => {
        const command = new Command('fetch', {
          method: 'ip'
        })
        try {
          await command.run()
        } catch (e) {
          assert.instanceOf(e, TypeError)
          assert.equal(e.message, 'Method required params not found', 'exception message')
        }
        assert.equal(command.status, undefined, 'no code')
        assert.equal(command.error, true, 'error=true')
      })
      it('do command for ip command. require params needed. throw error', async () => {
        const command = new Command('fetch', {
          method: 'ip'
        })
        try {
          await command.run({})
        } catch (e) {
          assert.instanceOf(e, TypeError)
          assert.equal(e.message, 'Method required params not found', 'exception message')
        }
        assert.equal(command.status, undefined, 'no code')
        assert.equal(command.error, true, 'error=true')
      })
      it('do command for ip command. require params invalid type. throw error', async () => {
        const command = new Command('fetch', {
          method: 'ip'
        })
        try {
          await command.run('some test string')
        } catch (e) {
          assert.instanceOf(e, TypeError)
          assert.equal(e.message, 'Method params should be an object', 'exception message')
        }
        assert.equal(command.status, undefined, 'no code')
        assert.equal(command.error, true, 'error=true')
      })
      it('do command. throw error for invalid params', async () => {
        const command = new Command('fetch', {
          method: 'ip'
        })
        try {
          await command.run({
            ipfs: false // invalid param
          })
        } catch (e) {
          assert.instanceOf(e, TypeError)
          assert.equal(e.message, 'Method required params not found', 'exception message')
        }
        assert.equal(command.status, undefined, 'code undefined')
        assert.equal(command.error, true, 'error=true')
      })
      it('do command. throw error for invalid required param', async () => {
        const command = new Command('fetch', {
          method: 'ip'
        })
        try {
          await command.run({
            ip: false // invalid param
          })
        } catch (e) {
          assert.instanceOf(e, TypeError)
          assert.equal(e.message, 'Method required param \'ip\' validation error', 'exception message')
        }
        assert.equal(command.status, undefined, 'code undefined')
        assert.equal(command.error, true, 'error=true')
      })
      it('do command. throw error for invalid required param validation', async () => {
        const command = new Command('fetch', {
          method: 'ip'
        })
        try {
          await command.run({
            ip: 'some string' // invalid param. not ip!
          })
        } catch (e) {
          assert.instanceOf(e, TypeError)
          assert.equal(e.message, 'Method required param \'ip\' validation error', 'exception message')
        }
        assert.equal(command.status, undefined, 'code undefined')
        assert.equal(command.error, true, 'error=true')
      })
      describe('Test requests.', () => {
        describe('method ip', () => {
          it('do command. fetch ip data. error for bad ip(127.0.0.1)', async () => {
            const command = new Command('fetch', {
              method: 'ip'
            })
            await command.run({
              ip: '127.0.0.1'
            })
            assert.equal(command.status, 400, 'code 400')
            assert.equal(command.error, true, 'error=true')
            assert.deepEqual(command.args, [{
              'arg': 'ip',
              'val': '127.0.0.1'
            }], 'arguments')
            assert.startsWith(command.url, 'https://tempicolabs.com/api/v2/ip/127.0.0.1/', 'correct url')
            assert.equal(command.statusText, 'BAD REQUEST')
            assert.equal(command.errorText, 'Incorrect IPv4 address', 'incorrect ipv4 address')
          })
          it('do command. fetch google ip data. using alias as require param', async () => {
            const command = new Command('fetch', {
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
          it('do command. fetch google ip data. optional parameter invalid', async () => {
            const command = new Command('fetch', {
              method: 'ip'
            })
            try {
              await command.run({
                ipaddr: '173.194.122.233', // google ip address. using alias
                mode: 'string'
              })
            } catch (e) {
              assert.instanceOf(e, TypeError)
              assert.equal(e.message, 'Method optional param \'mode\' validation error', 'exception message')
            }
            assert.equal(command.status, undefined, 'code undefined')
            assert.equal(command.error, true, 'error=true')
            assert.deepEqual(command.args, [], 'arguments')
          })
          it('do command. fetch google ip data. valid optional parameter', async () => {
            const command = new Command('fetch', {
              method: 'ip'
            })
            await command.run({
              ipaddr: '173.194.122.233', // google ip address. using alias
              mode: 'blacklist'
            })
            assert.equal(command.status, 404, 'not blacklisted')
            assert.equal(command.error, false, 'error=false')
            assert.deepEqual(command.args, [{
              arg: 'ipaddr',
              val: '173.194.122.233'
            }, {
              arg: 'mode',
              val: 'blacklist'
            }], 'arguments')
            assert.startsWith(command.url, 'https://tempicolabs.com/api/v2/ip/173.194.122.233/blacklist/', 'correct url')
            assert.equal(command.statusText, 'NOT FOUND')
            assert.equal(command.content.blacklisted, false)
          })
        })
        describe('method dns', () => {
          it('do command. checking google.com', async () => {
            const command = new Command('fetch', {
              method: 'dns'
            })
            await command.run({
              domain: 'google.com'
            })
            // assert.equal(command.errorText, undefined);
            // assert.equal(command.content.isp, 'Google');
            assert.equal(command.status, 200, 'status good')
            assert.equal(command.error, false, 'error=false')
            assert.deepEqual(command.args, [{
              arg: 'domain',
              val: 'google.com'
            }], 'arguments')
            assert.startsWith(command.url, 'https://tempicolabs.com/api/v2/dns/google.com', 'correct url')
            assert.equal(command.statusText, 'OK')
            assert.hasAllKeys(command.content, ['google.com'])
          })
        })
        describe('method hash', () => {
          it('do command. checking file hash', async () => {
            const hash = 'ff2178501f16e2c6ab435cfbabd45c90e7419c0e828d7da9d5c63acf016ba051';
            const command = new Command('fetch', {
              method: 'hash'
            })
            await command.run({
              hash
            })
            assert.equal(command.status, 404, 'not found')
            assert.equal(command.error, false, 'error=true')
            assert.deepEqual(command.args, [{
              arg: 'hash',
              val: hash
            }], 'arguments')
            assert.startsWith(command.url, `https://tempicolabs.com/api/v2/hash/${hash}`, 'correct url')
            assert.equal(command.statusText, 'NOT FOUND')
            assert.hasAllKeys(command.content, ['mtime', 'mtime-human', 'sha256', 'status'])
            assert.equal(command.content.sha256, hash, 'equal hash')
          })
        })
        describe('method scan', () => {
          it('do command. with required parameter alias', async () => {
            const ip = '173.194.122.233'
            const command = new Command('fetch', {
              method: 'scan'
            })
            await command.run({
              ipaddr: ip
            })
            assert.equal(command.status, 200)
            assert.equal(command.error, false, 'error=false')
            assert.deepEqual(command.args, [{
              arg: 'ipaddr',
              val: '173.194.122.233'
            }], 'arguments')
            assert.startsWith(command.url, `https://tempicolabs.com/api/v2/scan/${ip}`, 'correct url')
            assert.equal(command.statusText, 'OK')
            assert.containsAllKeys(command.content, ['addresses', 'hostnames', 'status', 'tcp', 'vendor'])
          })
          it('do command. with required parameter alias + portmin & portmax', async () => {
            const ip = '173.194.122.233'
            const portmin = 79
            const portmax = 100
            const command = new Command('fetch', {
              method: 'scan'
            })
            await command.run({
              ipaddr: ip,
              portmin,
              portmax,
            })
            assert.equal(command.status, 200)
            assert.equal(command.error, false, 'error=false')
            assert.deepEqual(command.args, [{
              arg: 'ipaddr',
              val: '173.194.122.233'
            }, {
              arg: 'portmin',
              val: portmin
            }, {
              arg: 'portmax',
              val: portmax
            }], 'arguments')
            assert.startsWith(command.url, `https://tempicolabs.com/api/v2/scan/${ip}/${portmin}/${portmax}`, 'correct url')
            assert.equal(command.statusText, 'OK')
            assert.containsAllKeys(command.content, ['addresses', 'hostnames', 'status', 'tcp', 'vendor'])
          })
        })
        describe('method me', () => {
          it('do command. without ahy parameters', async () => {
            const command = new Command('fetch', {
              method: 'me'
            })
            await command.run()
            assert.equal(command.status, 200)
            assert.equal(command.error, false, 'error=true')
            assert.deepEqual(command.args, [], 'arguments')
            assert.startsWith(command.url, `https://tempicolabs.com/api/v2/me`, 'correct url')
            assert.equal(command.statusText, 'OK')
            assert.containsAllKeys(command.content, ['as-name', 'ports', 'device', 'browser', 'blacklisted', 'touchscreen'])
            assert.equal(command.content.browser, 'Other')
            assert.equal(command.content.device, 'Other')
            assert.equal(command.content.touchscreen, false)
            assert.equal(command.content['ua-raw'], 'Linux_x64 Node v6.10.3 - TempicoLabs SDK')
          })
        })
        it('do command. custom header, User-Agent', async () => {
          const command = new Command('fetch', {
            method: 'me'
          })
          await command.run({
            headers: {
              'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
          })
          assert.equal(command.status, 200)
          assert.equal(command.error, false, 'error=true')
          assert.deepEqual(command.args, [], 'arguments')
          assert.startsWith(command.url, `https://tempicolabs.com/api/v2/me`, 'correct url')
          assert.equal(command.statusText, 'OK')
          assert.containsAllKeys(command.content, ['as-name', 'ports', 'device', 'browser', 'blacklisted', 'touchscreen'])
          assert.equal(command.content.browser, 'Chrome 58.0.3029')
          assert.equal(command.content.device, 'PC')
          assert.equal(command.content.touchscreen, false)
          assert.equal(command.content['ua-raw'], 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36')
        })
        it('do command. with mode parameter', async () => {
          const command = new Command('fetch', {
            method: 'me'
          })
          await command.run({
            mode: 'blacklist'
          })
          assert.equal(command.status, 404, 'not found')
          assert.equal(command.error, false, 'error=true')
          assert.deepEqual(command.args, [{
            arg: 'mode',
            val: 'blacklist'
          }], 'arguments')
          assert.startsWith(command.url, `https://tempicolabs.com/api/v2/me/blacklist`, 'correct url')
          assert.equal(command.statusText, 'NOT FOUND')
          assert.containsAllKeys(command.content, ['blacklisted'])
        })
      })
    })
    describe('Action Status', () => {
      it('check balance properties', async () => {
        const command = new Command('status', false)
        await command.run()
        assert.hasAnyKeys(command.headers, [
          'x-balance-remaining', 'x-balance-lastbill', 'x-balance-reset'
        ], 'has balance keys in headers')
        assert.hasAllKeys(command.content, [
          'balance', 'stats'
        ], 'has balance & stats keys in body')
        assert.hasAllKeys(command.content.balance, [
          'reset', 'remaining'
        ], 'check balance object')
        assert.hasAllKeys(command.content.stats, [
          'blacklisted', 'objects', 'queue'
        ], 'check stats object')
        assert.equal(command.status, 200, 'code 200')
      })
    })
  })
  describe('Class FetchCommand', () => {
    it('init object with undefined params', () => {
      assert.throw(() => {
        new FetchCommand()
      }, ReferenceError, 'Empty params object')
    })
    it('init object with empty params', () => {
      assert.throw(() => {
        new FetchCommand({})
      }, ReferenceError, 'Empty params object')
    })
    it('init object with invalid params type', () => {
      assert.throw(() => {
        new FetchCommand('asds')
      }, ReferenceError, 'Invalid params type')
    })
    it('do command without method required params', async () => {
      const command = new FetchCommand({
        method: 'ip'
      })
      try {
        await command.run()
      } catch (e) {
        assert.instanceOf(e, TypeError)
        assert.equal(e.message, 'Method required params not found', 'exception message')
      }
      assert.equal(command.status, undefined, 'no code')
      assert.equal(command.error, true, 'error=true')
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
})
