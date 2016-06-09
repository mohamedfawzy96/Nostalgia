$("#doneEffects").click(function(){
  $(".effects").fadeOut();
  $(".filter").fadeOut();

})

$(".filter").click(function(){
  $(".effects").fadeOut();
  $(".Orginaldate1").fadeOut();


  $(".filter").fadeOut();

})

$(".time").click(function(){
  $(".effects").fadeIn();
  $(".filter").fadeIn();

})


$("#drop").click(function(){
  $(".Orginaldate1").fadeIn();
  $(".filter").fadeIn();

})
$("li").click(function(){
  $(".Orginaldate1").fadeOut();
  $(".filter").fadeOut();
  $("#drop").html($(this).html())

})
