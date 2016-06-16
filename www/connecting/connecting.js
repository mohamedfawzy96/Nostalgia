$("#find").click(function(){
  $(".searchView").css({"display":"block"});
  setTimeout(function(){
    $(".searchView").css({"transform":"translateX(0)"});

  },100)




})
$(".cancel").click(function(){
  $(".searchView").css({"transform":"translateX(800px)"});

  setTimeout(function(){
    $(".searchView").css({"display":"none"});


  },800)




})
