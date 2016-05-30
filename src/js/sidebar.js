$(".menu-toggle").click(function(e) {
  e.preventDefault();
  $("#drawer-backdrop").toggleClass("drawer-backdrop-open");
  $(".content").toggleClass("no-scroll");
  $(".content").toggleClass("sidebar-expanded");
  $(".sidebar").toggleClass("sidebar-open");
});

var scrollingDiv = document.getElementsByClassName("content")[0];

scrollingDiv.addEventListener('touchmove', function(event){
  event.stopPropagation();
});
