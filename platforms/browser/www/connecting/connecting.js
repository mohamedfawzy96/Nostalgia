$("#find").click(function(){
  $(".searchView").css({"display":"block"});
  setTimeout(function(){
    $(".searchView").css({"transform":"translateX(0)"});

  },100)




})
$("#friends").click(function(){
  $(".friendsView").css({"display":"block"});
  setTimeout(function(){
    $(".friendsView").css({"transform":"translateX(0)"});

  },100)




})
$(".cancel").click(function(){
  $(".view").css({"transform":"translateX(800px)"});

  setTimeout(function(){
    $(".view").css({"display":"none"});


  },800)




})
