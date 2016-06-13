$(".photo").addClass("addedClass")


$(".filter").click(function(){
  $(".photo").fadeOut();
  $(".filter").fadeOut();
  $(".photo").removeClass("addedClass")

});


$(".imgMemory").click(function(){
  $(".photo").fadeIn()
  $(".photo").addClass("addedClass")
  $(".filter").fadeIn();

});

$(".view").click(function(){
  $(".photo").fadeIn()
  $(".photo").addClass("addedClass")
  $(".filter").fadeIn();

});
