$(".photo").addClass("addedClass")

setTimeout(function(){
  $(".filter").click(function(){
    $(".photo").fadeOut();
    $(".filter").fadeOut();
    $(".photo").removeClass("addedClass")

  });

},1000)

$(".tagInput input").fadeIn();


$("#tag").click(function(){


});


$("#back3").click(function(){
  $(".photo").fadeOut();
  $(".filter").fadeOut();
  $(".photo").removeClass("addedClass")

});
$(".back").click(function(){
  window.location  = "../Home/home.html"

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
