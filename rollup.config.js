import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import babili from 'rollup-plugin-babili'
import replace from 'rollup-plugin-replace'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

let external = !process.env.production && !process.env.browser ? ['os', 'url', 'http', 'https', 'zlib', 'stream', 'buffer', 'string_decoder', 'util', 'crypto', 'fs'] : []

const pkg = require('./package.json')

const replaceOptions = {
  exclude: 'node_modules/**',
  'process.env.TMLABS_VERSION': JSON.stringify(pkg.version)
}

if (process.env.production || process.env.browser) replaceOptions['process.env.TMLABS_KEY'] = false
if (process.env.browser) replaceOptions['process.env.browser'] = true
else replaceOptions['process.env.browser'] = false

export default {
  entry: 'src/index.js',
  moduleName: 'TmLabs',
  plugins: [
    json(),
    resolve({
      jsnext: true,
      main: true,
      browser: process.env.production || process.env.browser,
      preferBuiltins: false
    }),
    commonjs(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      'presets': [
        [
          'es2015',
          {
            'modules': false
          }
        ],
        [
          'stage-0'
        ]
      ],
      'plugins': [
        'transform-runtime',
        'external-helpers'
      ]
    }),
    // globals(),
    // builtins({ crypto: true }),
    replace(replaceOptions),
    process.env.production ? babili({
      comments: false,
      banner: `/**\r* Tempico Labs SDK v${pkg.version} \r*/`
    }) : false
  ],
  external: external,
  sourceMap: true
}
