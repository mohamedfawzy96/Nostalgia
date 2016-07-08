var height2 = $(".memorychat").height()- $(".headOfMemory").height()
$(".memchat").height(height2+"px")


$(".mphoto").addClass("maddedClass")

setTimeout(function(){
  $(".mfilter").click(function(){
    $(".mphoto").fadeOut();
    $(".mfilter").fadeOut();
    $(".mphoto").removeClass("maddedClass")

  });

},1000)

$(".mtagInput input").fadeIn();

var expand = true
$(".expand").click(function(){
  if(expand){
    $(".photo").css({"height":"0"})
    $(".memorychat").css({"top":"35vh"})
    $(".expand img").css({"transform":"rotate(180deg)"})
    $(".input22").css({"transform":"translateX(0)"})

    expand = false;
    $(".memchat").height(49.5+"vh")


  }else{
    $(".photo").css({"height":"36vh"})
    $(".memorychat").css({"top":"75vh"})
    $(".expand img").css({"transform":"rotate(0)"})
    expand = true
    $(".memchat").height(height2+"px")
    $(".input22").css({"transform":"translateX(1000px)"})



  }


});


$("#back3").click(function(){
  $(".mphoto").fadeOut();
  $(".mfilter").fadeOut();
  $(".mphoto").removeClass("maddedClass")

});
$(".newback").click(function(){
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
