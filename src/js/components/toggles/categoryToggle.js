
function toggleCategory(action) {
  $.ajax({
    type: 'POST',
    url: action,
    headers: { 'HTTP_X_CSRFTOKEN': Cookies.get('csrftoken') }
  });
}

$('.categoryToggle').on('click', function(e) {
  let target = $($(this).data('target'));
  let categoryId = $(this).data('categoryId');

  toggleCategory(categoryId);
  target.toggleClass('category--closed');

  e.preventDefault();
});
