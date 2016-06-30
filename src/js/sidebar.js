$(".menu-toggle").click(function(e) {
  e.preventDefault();
  $("#drawer-backdrop").toggleClass("drawer-backdrop-open");
  $(".content").toggleClass("no-scroll");
  $(".content").toggleClass("sidebar-expanded");
  $(".sidebar").toggleClass("sidebar-open");
});
