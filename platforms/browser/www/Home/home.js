$(".tab1").click(function(){

  $("#body1").css({"display":"block"});
  $("#body2").css({"display":"none"});
  $(this).css({"border-bottom":"7px solid white"});
  $(".tab2").css({"border":"0"});
  $(".tab3").css({"border":"0"});





});

$(".tab2").click(function(){

  $("#body2").css({"display":"block"});
  $("#body1").css({"display":"none"});
  $("tab").css({"border":"0"});

  $(this).css({"border-bottom":"7px solid white"});
  $(".tab1").css({"border":"0"});
  $(".tab3").css({"border":"0"});




});

$(".tab3").click(function(){

  $("#body2").css({"display":"block"});
  $("#body1").css({"display":"none"});
  $("tab").css({"border":"0"});

  $(this).css({"border-bottom":"7px solid white"});
  $(".tab1").css({"border":"0"});
  $(".tab2").css({"border":"0"});




});



$("#send").click(function(){
  window.location = '../Send/Send.html'


})
