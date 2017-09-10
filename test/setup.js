/* Configure Mocha test runner */

const tmLabsPackage = require('./../package.json')

process.env.NODE_ENV = 'test'
process.env.TMLABS_VERSION = tmLabsPackage.version
