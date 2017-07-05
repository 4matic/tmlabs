/* Configure Mocha test runner */

process.env.NODE_ENV = 'test';

function noop() {
  return null;
}

require.extensions['.md'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.gif'] = noop;
