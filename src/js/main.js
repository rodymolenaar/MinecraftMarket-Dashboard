var $ = require('jquery');
global.jQuery = require("jquery");
require('bootstrap-sass');
require('bootstrap-select');
require('justgage');
require('./sidebar.js');

$(document).ready( function () {
  $('.selectpicker').selectpicker({
    iconBase: 'fa',
    tickIcon: 'fa-check',
    style: 'btn-select',
    width: 'fit'
  });
});

$(document).ready( function () {
  $('.selectpicker-lg').selectpicker({
    iconBase: 'fa',
    tickIcon: 'fa-check',
    style: 'btn-select btn-select--lg',
    width: 'fit'
  });
});
