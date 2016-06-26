var elixir = require('laravel-elixir');

require('laravel-elixir-vueify');

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
    mix.browserify('main.js');
      // .sass('app.scss', 'dist/css/app.css')
      //  .copy(paths.fontawesome + 'fonts/**', 'dist/fonts/font-awesome')
      //  .copy(paths.mdif + 'dist/fonts/**', 'dist/fonts/material-design-iconic-font');
});

// elixir(function(mix) {
//     mix.browserify('assets/main.js');
//     mix.scripts([
//          paths.jquery + 'dist/jquery.js',
//          paths.bootstrap + 'javascripts/bootstrap.js',
//          'node_modules/justgage/justgage.js',
//          'dist/js/sidebar.js'
//        ], 'dist/js/main.js', './');
// });
