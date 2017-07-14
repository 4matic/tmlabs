import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import babili from 'rollup-plugin-babili'
import replace from 'rollup-plugin-replace'

let external = !process.env.production ? ['os', 'url', 'http', 'https', 'zlib', 'stream', 'buffer', 'string_decoder', 'util', 'crypto', 'fs'] : ['crypto']

const replaceOptions = {
  exclude: 'node_modules/**',
  'VERSION': 'v1.0.0'
}

if (process.env.production) replaceOptions['process.env.TMLABS_KEY'] = false

console.log('replaceOptions', replaceOptions)

export default {
  entry: 'src/index.js',
  moduleName: 'TmLabs',
  plugins: [
    json(),
    resolve({
      jsnext: true,
      main: true,
      browser: process.env.production,
      preferBuiltins: process.env.production
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
    replace(replaceOptions),
    process.env.production ? babili({
      comments: false,
      banner: '/**\r* Tempico Labs SDK v1.0.0 \r*/'
    }) : false
  ],
  external: external,
  sourceMap: true
}
