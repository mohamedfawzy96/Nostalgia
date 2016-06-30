$(".text").click(function(){
  if($(this).html()=="Next") {
  $(".choosePhoto").css({"transform":"translateX(-1000px)"})
  $(".last").css({"transform":"translateX(0)"})
  $(this).html("Done")
  } else {

  }
});

$(".back").click(function(){
  if($(".text").html()=="Done"){
  $(".choosePhoto").css({"transform":"translateX(0px)"})
  $(".last").css({"transform":"translateX(1000px)"})
  $(".text").html("Next")
  } else {

  }
});

$(".eff").click(function() {
  $(".eff").css({  "border":"0"})
  $(this).css({  "border":"3px solid grey"})
  if($(this).children(".time").html()=="1970"){
  $(".photo1").css({"filter":"grayscale(100%)"})
  $(".photo1").css({"-webkit-filter":"grayscale(100%)"})
  } else {
    $(".photo1").css({"filter":"grayscale(0)"})
    $(".photo1").css({"-webkit-filter":"grayscale(0)"})
    var filter = $(this).children(".filterEff").css("background-color")
    $(".filterEffpho").css({"background-color":filter})
  }
});
