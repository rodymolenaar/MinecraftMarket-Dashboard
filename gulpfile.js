var elixir = require('laravel-elixir');

require('laravel-elixir-browserify-official');
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
elixir.config.publicPath = 'dist/upload/dist';

/*
 |--------------------------------------------------------------------------
 | Asset Management
 |--------------------------------------------------------------------------
 */

elixir(function(mix) {
    mix.sass('main.scss', 'upload/dist/css/main.css')
       .fileinclude()
       .copy(paths.fontawesome + 'fonts/**', 'upload/dist/fonts/font-awesome')
       .copy(paths.mdif + 'dist/fonts/**', 'upload/dist/fonts/material-design-iconic-font')
       .copy(paths.bootstrap + 'fonts/bootstrap/**', 'upload/dist/fonts/bootstrap')
       .browserify('main.js', 'upload/dist/js/main.js');
});
