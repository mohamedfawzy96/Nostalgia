var privateattr = true
var captionattr = $(".rest input").text()
var date = "Can't remember"
var effectattr= "normal"
var membersArray = new Array();
var img = new Image;


$(".text").click(function(){
  if($(this).html()=="Next"){


  $(".choosePhoto").css({"transform":"translateX(-1000px)"})
  $(".last").css({"transform":"translateX(0)"})
  $(this).html("Post")

} else if ($(".text").html()=="Done") {
  $(".members").css({"transform":"translateY(10000px)"})
  $(".back").css({"opacity":"1"})

  $(this).html("Post");


} else if ($(".text").html()=="Post") {
  finalize();
}
});

function getMembers(){
  var users = database.ref().child("users");
  users.once('value', function(usersSnap){
    usersSnap.forEach(function(user){
      if(user.key!="usernames") {
        addmembers(user.child("username").val(), user.child("uid").val());
      }
    });
  });
};

function addmembers(user, id){
  var html = "<li rel=\""+id+"\">"
          +  "<div class=\"user\">"
          +    "<div class=\"profilephoto\" style=\"background-image:url(\'img/test.jpg\')\">"
          +    "</div>"
          +    "<div class=\"name\"> "
          +    user
          +    "</div>"
          +  "</div>"
          +  "<div class=\"checking\">"
          +  "<input type=\"checkbox\" name=\""+user+"\" id=\"added\">"
          +  "</div>"
          +  "</li>";
  $(".content").append(html);
}

$("#addMembers").click(function(){
  $(".members").css({"transform":"translateY(0)"});
  setTimeout(function(){
    $(".text").html("Done")
    $(".back").css({"opacity":"0"});
  }, 700);
  $(".content").html("");
  getMembers();
});

$(document).on('click ', 'input[type="checkbox"]', function(event) {
  if($(this).parent().parent().attr('class')=="checked") {
    $(this).parent().parent().attr('class','unchecked');
  } else {
    $(this).parent().parent().attr('class','checked');
  }
});


$("#addDate").click(function(){


  $(".date").css({"transform":"translateX(0)"})
  $(".filterB").fadeIn()
});
$(".Dateoptions").click(function(){
  $(".date").css({"transform":"translateX(1000px)"})
  $(".filterB").fadeOut()
  alert(date)






})
$(".filterB").click(function(){
  $(".date").css({"transform":"translateX(1000px)"})
  $(".filterB").fadeOut()






})


$(".back").click(function(){
  if($(".text").html()=="Post"){


  $(".choosePhoto").css({"transform":"translateX(0px)"})
  $(".last").css({"transform":"translateX(1000px)"})
  $(".text").html("Next")

}else {

}


})
$(".eff").click(function(){
  $(".eff").css({  "border":"0"})
  effectattr = $(this).children(".time").html()


  $(this).css({  "border":"3px solid grey"})
  if($(this).children(".time").html()=="1970"){
  $(".photo1").css({"filter":"grayscale(100%)"})
  $(".photo1").css({"-webkit-filter":"grayscale(100%)"})


  }

  else{
    $(".photo1").css({"filter":"grayscale(0)"})
    $(".photo1").css({"-webkit-filter":"grayscale(0)"})
    var filter = $(this).children(".filterEff").css("background-color")
    $(".filterEffpho").css({"background-color":filter})

  }



})
