
$name = $("#usernameSet input")
$username = $("#nameSet input")
$name.val("Ahmed5")
$username.val("Ahmed Amr")
$save = $(".save")
$changephoto = $(".change")



$("#settings").click(function(){
  $(".settingsView").css({"display":"block"});
  setTimeout(function(){
    $(".settingsView").css({"transform":"translateX(0)"});
    $(".btnbk img").attr("src","img/back.svg")
    $(".btnbk ").removeClass("back")
    $(".btnbk ").addClass("cancel2")
  }, 100);
});
