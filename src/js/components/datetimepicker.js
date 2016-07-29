
$(function () {
  
  $.fn.datetimepicker.defaults.icons = {
    time: 'zmdi zmdi-time',
    date: 'zmdi zmdi-calendar',
    up: 'zmdi zmdi-chevron-up',
    down: 'zmdi zmdi-chevron-down',
    previous: 'zmdi zmdi-chevron-left',
    next: 'zmdi zmdi-chevron-right',
    today: 'zmdi zmdi-gamepad',
    clear: 'zmdi zmdi-delete',
    close: 'zmdi zmdi-close'
  };

  $('#datetimepicker1').datetimepicker();
});
