
$("#find").click(function(){
  $(".searchView").css({"display":"block"});
  setTimeout(function(){
    $(".searchView").css({"transform":"translateX(0)"});
    $(".btnbk img").attr("src","img/back.svg")
    $(".btnbk ").removeClass("back")
    $(".btnbk ").addClass("cancel2")

  },100)




})
$("#friends").click(function(){
  $(".friendsView").css({"display":"block"});
  setTimeout(function(){
    $(".friendsView").css({"transform":"translateX(0)"});
    $(".btnbk img").attr("src","img/back.svg")
    $(".btnbk ").removeClass("back")
    $(".btnbk ").addClass("cancel2")
  },100)
})

$(".request").click(function(){
  $(".requestsView").css({"display":"block"});
  setTimeout(function(){
    $(".requestsView").css({"transform":"translateX(0)"});
    $(".btnbk img").attr("src","img/back.svg")
    $(".btnbk ").removeClass("back")
    $(".btnbk ").addClass("cancel2")

  },100)




})

$(".btnbk").click(function(){
  var x = $(this).attr("class")+""
  var y = x.split(" ")[1]
  if(y==("cancel2")){
  $(".view").css({"transform":"translateX(800px)"});
  setTimeout(function(){
    $(".view").css({"display":"none"});
    $(".btnbk ").addClass("back")
    $(".btnbk ").removeClass("cancel2")

  },800)
  $(".btnbk img").attr("src","../Memory/img/home.svg")

}else{
  window.location = "../Home/home.html"
}




})
$(document).on('click tap', '.k', function(){
  $(this).removeClass("AddFriend")
  $(this).html("Requested")

  $(this).addClass("requested")

})
