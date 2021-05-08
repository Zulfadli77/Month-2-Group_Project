$("#toggle").click(function() {
  $(this).toggleClass("active");
  $("#fullnav").toggleClass("open");
});

$(".hamburger-menu").click(function() {
  $(this).toggleClass("change");
});

$("#fullnavMenu a").on("click", function() {
  $(".hamburger-menu").removeClass("change");
  $("#toggle").removeClass("active");
  $("#fullnav").removeClass("open");
});