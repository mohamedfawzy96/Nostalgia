$("#doneEffects").tap(function(){
  $(".effects").fadeOut();
  $(".filter").fadeOut();
});

$("#doneMembers").tap(function(){
  $(".members").fadeOut();
  $(".filter").fadeOut();
});

$(".filter").tap(function(){
  $(".effects").fadeOut();
  $(".Orginaldate1").fadeOut();
  $(".members").fadeOut();
  $(".filter").fadeOut();
});

$("#addMember").tap(function(){
  $(".members").fadeIn();
  $(".filter").fadeIn();
});

$(".time").tap(function(){
  $(".effects").fadeIn();
  $(".filter").fadeIn();
});





$("#drop").tap(function(){
  $(".Orginaldate1").fadeIn();
  $(".filter").fadeIn();
});

$(".listOfDates li").tap(function(){
  $(".Orginaldate1").fadeOut();
  $(".filter").fadeOut();
  $("#drop").html($(this).html())
});
