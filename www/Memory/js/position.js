var height2 = $(".memorychat").height()- $(".headOfMemory").height()
$(".memchat").height(height2+"px")


$(".mphoto").addClass("maddedClass")

$(".Tit").click(function(){
  $(".mem2").css({"display":"block"})
  $(".mem2").css({"transform":"translateX(0)"})
  $(".Tit").css({"opacity":"0"})
  $(".bet").html("Members")

})

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
  if($(".bet").html() !="Members"){
    $(".mfullScreen").css({"transform":"translateX(800px)"})
    $(".photo img").attr("src","")
    $(".photo filterpho2").css({"background-color":"rgba(0,0,0,0)"})
  }else{
    $(".mem2").css({"transform":"translateX(1000px)"})
    $(".Tit").css({"opacity":"1"})
    $(".bet").html("Memory")

  }




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
$(".profcancel").click(function(){
  $(".prof").css({"transform":"translateY(1000px)"})
  $(".ff33").fadeOut()


});
var idu;
$(document).on('tap', '#chattingbody2 li', function() {
  $(".prof").css({"transform":"translateY(0)"})
   idu = $(this).attr("rel");
  updateprof(idu)
  $(".ff33").fadeIn()


})
$(document).on('tap', '.AddFriend', function() {
  $(".k").removeClass("AddFriend")
  $(".k").addClass("requested")
  $(".k").html("Requested")
  var requestID = database.ref().child('requests').push();
  var From = firebase.auth().currentUser.uid;
  var to = idu;
  var users = database.ref().child('users');
  var request = new Request(From,to,false)
  users.child(to).once("value",function(snapshot){
    var num = snapshot.child("ReceivedRequests").numChildren()
    var ID = (requestID+"").split("/").pop();
    users.child(to).child("ReceivedRequests").child(num).set(ID+"");

  });

  users.child(From).once("value",function(snapshot){
    var num = snapshot.child("SentRequests").numChildren();
    var ID = (requestID+"").split("/").pop();
    users.child(From).child("SentRequests").child(num).set(ID+"");

  });

  requestID.set(request);


})
