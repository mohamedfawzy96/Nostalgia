var height = $(".card").height() + $(".head").height() + $(".interactions").height() + 25 + 20 + 10
var fullheight = $(window).height();
var chatHeight = fullheight - height;
$(".chat").height(chatHeight)
var widthHeight = -($("input").height()/2);
$(".send1").css({"line-height":($(".send1").height()/2)+"px"});
$(".send1").click(function(){
  alert("hi")

})

//$("input").css({"margin-top":widthHeight+"px"});
