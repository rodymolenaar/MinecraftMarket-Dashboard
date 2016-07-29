var elixir = require('laravel-elixir');

require('laravel-elixir-webpack-official');
require('./elixir-extensions')

/*
 |--------------------------------------------------------------------------
 | Paths
 |--------------------------------------------------------------------------
 */
var paths = {
    'jquery': 'node_modules/jquery/',
    'bootstrap': 'node_modules/bootstrap-sass/assets/',
    'fontawesome': 'node_modules/font-awesome/',
    'mdif': 'node_modules/material-design-iconic-font/'
}

/*
 |--------------------------------------------------------------------------
 | Config
 |--------------------------------------------------------------------------
 */

elixir.config.assetsPath = 'src';
elixir.config.publicPath = 'dist/build/dist';

/*
 |--------------------------------------------------------------------------
 | Asset Management
 |--------------------------------------------------------------------------
 */

elixir(function(mix) {
    mix.sass('main.scss', 'build/dist/css/main.css')
       .fileinclude()
       .copy(paths.fontawesome + 'fonts/**', 'build/dist/fonts/font-awesome')
       .copy(paths.mdif + 'dist/fonts/**', 'build/dist/fonts/material-design-iconic-font')
       .copy(paths.bootstrap + 'fonts/bootstrap/**', 'build/dist/fonts/bootstrap')
       .webpack('main.js', 'build/dist/js/main.js');
});
