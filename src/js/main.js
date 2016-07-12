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

});

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function toggleCategory(action) {
  $.ajax({
    type: 'POST',
    url: action,
    headers: { 'HTTP_X_CSRFTOKEN': getCookie('csrftoken') }
  });
}

$('.modalToggle').on('click', function(e) {
  let remote = $(this).data('remote');
  $('#mainModal').load(remote);
  $('#mainModal').modal('show');
  e.preventDefault();
});

$('.categoryToggle').on('click', function(e) {
  let target = $($(this).data('target'));
  let categoryId = $(this).data('categoryId');

  toggleCategory(categoryId);
  target.toggleClass('category--closed');

  e.preventDefault();
});
