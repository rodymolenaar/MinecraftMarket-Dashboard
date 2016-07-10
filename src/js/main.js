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

$('#deleteModal').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget);
  let data = {
    'type': button.data('type'),
    'action': button.data('action')
  };
  let modal = $(this);
  modal.find('.modal-title').text(`Delete ${data.type}`);
  modal.find('.modal-body').text(`Are you sure you want to delete this ${data.type}?`);
  modal.find('.modal-footer').html(`
    <button type="button" class="btn btn-primary-inverted" data-dismiss="modal">Close</button>
    <a href="${data.action}" class="btn btn-danger-inverted">Delete</a>
    `);
  });
