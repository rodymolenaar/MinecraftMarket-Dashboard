var elixir = require('laravel-elixir');

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
elixir.config.publicPath = 'dist';

/*
 |--------------------------------------------------------------------------
 | Asset Management
 |--------------------------------------------------------------------------
 */

elixir(function(mix) {
    mix.sass('main.scss', 'dist/css/main.css')
       .fileinclude()
       .copy(paths.bootstrap + 'fonts/bootstrap/**', 'dist/fonts/bootstrap')
       .copy(paths.fontawesome + 'fonts/**', 'dist/fonts/font-awesome')
       .copy(paths.mdif + 'dist/fonts/**', 'dist/fonts/material-design-iconic-font');
});

elixir(function(mix) {
    mix.browserify('sidebar.js');
    mix.scripts([
         paths.jquery + 'dist/jquery.js',
         paths.bootstrap + 'javascripts/bootstrap.js',
         'dist/js/sidebar.js'
       ], 'dist/js/main.js', './');
});
