import {
  EMAIL_LEAKS,
  SCAN,
  HASH,
  DNS,
  ME,
  IP
} from './endpoint'

const mode = ['detailed', 'simple', 'blacklist', 'geoip']

/**
 * @module argument
 * @readonly
 * @desc Endpoint specifications object
 * @memberOf module:constants
 */
export default {
  [EMAIL_LEAKS]: [
    {
      arg: 'email',
      required: true,
      check: {
        func: 'isEmail',
        args: [{
          require_display_name: false,
          allow_display_name: false,
          allow_utf8_local_part: true
        }]
      }
    }
  ],
  [SCAN]: [
    {
      arg: 'ip',
      alias: 'ipaddr',
      required: true,
      check: {
        func: 'isIP',
        args: [4]
      }
    },
    {
      arg: 'portmin',
      required: false,
      check: {
        func: 'isInt',
        args: [{
          gt: 0,
          lt: 65535
        }]
      }
    },
    {
      arg: 'portmax',
      required: false,
      check: {
        func: 'isInt',
        args: [{
          gt: 0,
          lt: 65535
        }]
      }
    }
  ],
  [HASH]: [
    {
      arg: 'hash',
      required: true,
      check: {
        func: 'matches',
        args: [/[0-9a-f]{5,40}/i]
      }
    }
  ],
  [IP]: [
    {
      arg: 'ip',
      alias: 'ipaddr',
      required: true,
      check: {
        func: 'isIP',
        args: [4]
      }
    },
    {
      arg: 'mode',
      required: false,
      check: mode
    }
  ],
  [DNS]: [
    {
      arg: 'domain',
      required: true,
      check: {
        func: 'isFQDN',
        args: [{
          require_tld: true,
          allow_underscores: false,
          allow_trailing_dot: false
        }]
      }
    }
  ],
  [ME]: [
    {
      arg: 'mode',
      required: false,
      check: mode
    }
  ]
}
