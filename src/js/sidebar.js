$(".menu-toggle").click(function(e) {
  e.preventDefault();
  $("#drawer-backdrop").toggleClass("drawer-backdrop-open");
  $(".content").toggleClass("no-scroll");
  $(".content").toggleClass("sidebar-expanded");
  $(".sidebar").toggleClass("sidebar-open");
});

document.body.addEventListener('touchmove', function(event) {
  console.log(event.source);
  if (event.source == document.body) {
    event.preventDefault();
  }
}, false);

window.onresize = function() {
  $(document.body).width(window.innerWidth).height(window.innerHeight);
}

$(function() {
  window.onresize();
});
