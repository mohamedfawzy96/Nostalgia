$(".mphoto").addClass("maddedClass")

setTimeout(function(){
  $(".mfilter").click(function(){
    $(".mphoto").fadeOut();
    $(".mfilter").fadeOut();
    $(".mphoto").removeClass("maddedClass")

  });

},1000)

$(".mtagInput input").fadeIn();


$("#tag").click(function(){


});


$("#back3").click(function(){
  $(".mphoto").fadeOut();
  $(".mfilter").fadeOut();
  $(".mphoto").removeClass("maddedClass")

});
$(".mback").click(function(){
  window.location  = "../Home/home.html"

});


$(".mimgMemory").click(function(){
  $(".mphoto").fadeIn()
  $(".mphoto").addClass("maddedClass")
  $(".mfilter").fadeIn();

});

$(".mview").click(function(){
  $(".mphoto").fadeIn()
  $(".mphoto").addClass("maddedClass")
  $(".mfilter").fadeIn();

});
