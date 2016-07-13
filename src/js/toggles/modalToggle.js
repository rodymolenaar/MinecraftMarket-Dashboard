import $ from 'jquery';

$('.modalToggle').on('click', function(e) {
  let remote = $(this).data('remote');
  $('#mainModal').load(remote);
  $('#mainModal').modal('show');
  e.preventDefault();
});
