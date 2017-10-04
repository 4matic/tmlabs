/* eslint-disable import/extensions */

// @app.route('/api/v2/hash/<h>', methods=['GET'])
//
// @app.route('/api/v2/ip/<ipaddr>', methods=['GET'])
// @app.route('/api/v2/ip/<ipaddr>/<mode>', methods=['GET'])
//
// @app.route('/api/v2/me', methods=['GET'])
// @app.route('/api/v2/me/<mode>', methods=['GET'])
//
// @app.route('/api/email/leaks/<email>', methods=['GET'])
//
// @app.route('/api/v2/dns/<domain>', methods=['GET'])
//
// @app.route('/api/v2/scan/<ip>', methods=['GET'])
// @app.route('/api/v2/scan/<ip>/<portmin>', methods=['GET'])
// @app.route('/api/v2/scan/<ip>/<portmin>/<portmax>', methods=['GET'])
//
// @app.route('/api/status', methods=['GET'])

/**
 * @module endpoint
 * @desc Endpoint constants
 * @memberOf module:constants
 */

/**
 * IP
 * @type {string}
 * @constant
 * @default ip
 */
export const IP = 'ip'

/**
 * Hash
 * @type {string}
 * @constant
 * @default hash
 */
export const HASH = 'hash'

/**
 * Scan
 * @type {string}
 * @constant
 * @default scan
 */
export const SCAN = 'scan'

/**
 * Status
 * @type {string}
 * @constant
 * @default status
 */
export const STATUS = 'status'

/**
 * Account Status
 * @type {string}
 * @constant
 * @default account/status
 */
export const ACCOUNT_STATUS = 'account/status'

/**
 * DNS
 * @type {string}
 * @constant
 * @default dns
 */
export const DNS = 'dns'

/**
 * Me. Data based on your ip address
 * @type {string}
 * @constant
 * @default me
 */
export const ME = 'me'

/**
 * Email Leaks
 * @type {string}
 * @constant
 * @default email/leaks
 */
export const EMAIL_LEAKS = 'email/leaks'
