import $ from 'jquery';
import getCookie from './../utils/getCookie';

function toggleCategory(action) {
  $.ajax({
    type: 'POST',
    url: action,
    headers: { 'HTTP_X_CSRFTOKEN': getCookie('csrftoken') }
  });
}

$('.categoryToggle').on('click', function(e) {
  let target = $($(this).data('target'));
  let categoryId = $(this).data('categoryId');

  toggleCategory(categoryId);
  target.toggleClass('category--closed');

  e.preventDefault();
});
