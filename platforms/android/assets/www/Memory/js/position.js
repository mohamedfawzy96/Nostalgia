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
  $(".mfullScreen").css({"transform":"translateX(800px)"})

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
