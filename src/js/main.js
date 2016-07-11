global.jQuery = require("jquery");
var $ = global.jQuery;
require('jquery-ui');
require('bootstrap-sass');
require('bootstrap-select');
require('justgage');
require('./sidebar.js');

$(document).ready( function () {

  $('.selectpicker').selectpicker({
    iconBase: 'fa',
    tickIcon: 'fa-check',
    style: 'btn-select',
    width: 'fit',
    size: '7'
  });

  $('.selectpicker-lg').selectpicker({
    iconBase: 'fa',
    tickIcon: 'fa-check',
    style: 'btn-select btn-select--lg',
    width: 'fit',
    size: '7'
  });

  $('.modalToggle').on('click', function(e) {
    let remote = $(this).data('remote');
    $('#mainModal').load(remote);
    $('#mainModal').modal('show');
    e.preventDefault();
  });
  
});
