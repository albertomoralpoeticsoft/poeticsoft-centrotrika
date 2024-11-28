const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PolyfillInjectorPlugin = require('webpack-polyfill-injector')

const pluginname = 'poeticsoft-centrotrika'
const destdir = __dirname + '/' + pluginname
const pluginplublic = '/wp-content/plugins/' + pluginname

/*

Examples of automate compilation with .bat files:

from this folder:

block blockname -> compiles [blockname] with watch and delay livereload time
allblocksprod -> compiles all blocks in prod mode

*/

/*
https://gator1306.hostgator.com:2083/
mayeuta
#7mBvYVGzc6weSB9gx

// SERVER

Server gator3113.hostgator.com 
Username mayeuta
IP Address 174.37.190.158
Nameserver 1 ns6225.hostgator.com
Nameserver 2 ns6226.hostgator.com

// biomayeutika.org
info@mayeutika.org
mRzQl2#NEXFd*qrA

*/

module.exports = env => {  

  console.log(env)

  const input = Object.keys(env)[2] || ''  
  const params = input.split('-')
  const section = params[0] || 'app' // app
  const mode = params[1] || 'dev'
  const watch = params[2] == 'watch'  
  const paths = {}

  console.log('********************************************************')

  switch(section) {

    case 'app':

      paths.entryjs =         './src/' + section + '/main.js'
      paths.entryscss =       './src/' + section + '/main.scss'
      paths.output =          path.resolve(destdir + '/' + section + '/')
      paths.public =          pluginplublic + '/' + section + '/'
      paths.cssfilename =     'main.css'
      
      break;
  }

  console.log('-----------------------------')
  console.log('env')
  console.log('-----------------------------')
  console.log(env)
  console.log('-----------------------------')
  console.log('paths')
  console.log('-----------------------------')
  console.log(paths)
  console.log('-----------------------------')
  console.log('INPUT')
  console.log('-----------------------------')
  console.log('input > ' + input)
  console.log('section > ' + section)
  console.log('mode > ' + mode)
  console.log('watch > ' + watch)

  return {
    context: __dirname,
    stats: 'minimal',
    name: 'blank',
    watch: watch,
    entry: {
      main: `webpack-polyfill-injector?${JSON.stringify({
        modules: [
          paths.entryjs,
          paths.entryscss
        ]
      })}!`
    },
    output: {
      path: paths.output,
      publicPath: paths.public,
      filename: '[name].js'
    },
    mode: mode == 'prod' ? 'production' : 'development',
    devtool: mode == 'prod' ? 'none' : 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [          
            { 
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
                ]
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            { 
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new PolyfillInjectorPlugin({
        singleFile: true,
        polyfills: [
            'Array.prototype.fill',
            'Array.prototype.find',
            'Array.prototype.findIndex',
            'Array.prototype.includes',
            'String.prototype.startsWith',
            'Array.from',
            'Object.entries',
            'Object.values',
            'Object.assign', 
            'fetch',
            'Promise',
        ]
      }),
      new MiniCssExtractPlugin({
        filename: paths.cssfilename
      })
    ],
    resolve: {
      modules: [
        'node_modules'
      ],
      alias: {
        // Common
        ['node_modules']: path.resolve(__dirname + '/node_modules')
      },
      extensions: ['.js', '.jsx']
    }
  }
}