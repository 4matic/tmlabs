import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import babili from 'rollup-plugin-babili'
import replace from 'rollup-plugin-replace'

// let external = !process.env.production ? [] : [ 'whatwg-fetch'];
let external = []
export default {
  entry: 'src/index.js',
  moduleName: 'TmLabs',
  plugins: [
    json(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
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
        'external-helpers'
      ]
    }),
    replace({
      exclude: 'node_modules/**'
      // TMLABS_KEY: JSON.stringify(process.env.TMLABS_KEY || false)
    }),
    process.env.production ? babili({
      comments: false,
      banner: '/**\r* Tempico Labs SDK v0.1.0 \r*/'
    }) : false
  ],
  external: external,
  sourceMap: true
}
