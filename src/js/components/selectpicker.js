
$(document).ready( function () {

  // console.log('Selectpickers initiating...');

  $('.mm-selectpicker').selectpicker({
    iconBase: 'zmdi',
    tickIcon: 'zmdi-check',
    style: 'btn-select',
    width: 'fit',
    size: '7'
  });

  $('.mm-selectpicker-lg').selectpicker({
    iconBase: 'zmdi',
    tickIcon: 'zmdi-check',
    style: 'btn-select btn-select--lg',
    width: 'fit',
    size: '7'
  });

  // console.log('Selectpickers initiated!');

});
