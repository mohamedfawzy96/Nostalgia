$("#doneEffects").click(function(){
  $(".effects").fadeOut();
  $(".filter").fadeOut();
});

$("#doneMembers").click(function(){
  $(".members").fadeOut();
  $(".filter").fadeOut();
});

$(".filter").click(function(){
  $(".effects").fadeOut();
  $(".Orginaldate1").fadeOut();
  $(".members").fadeOut();
  $(".filter").fadeOut();
});

$("#addMember").click(function(){
  $(".members").fadeIn();
  $(".filter").fadeIn();
});

$(".time").click(function(){
  $(".effects").fadeIn();
  $(".filter").fadeIn();
<<<<<<< Updated upstream
});
=======
  $("#addMember").attr("disabled", true);


})
>>>>>>> Stashed changes


$("#drop").click(function(){
  $(".Orginaldate1").fadeIn();
  $(".filter").fadeIn();
});

$(".listOfDates li").click(function(){
  $(".Orginaldate1").fadeOut();
  $(".filter").fadeOut();
  $("#drop").html($(this).html())
});
