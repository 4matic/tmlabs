import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import babili from 'rollup-plugin-babili'

// let external = !process.env.production ? [] : [ 'whatwg-fetch'];
let external = []
export default {
  entry: 'src/index.js',
  moduleName: 'tmlabs',
  plugins: [
    json(),
    commonjs(),
    nodeResolve({
      jsnext: true
    }),
    babel({
      babelrc: false,
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
    process.env.production ? babili({
      comments: false,
      banner: '/**\r* Tempico Labs SDK v0.1.0 \r*/'
    }) : false
  ],
  external: external,
  sourceMap: true
}
