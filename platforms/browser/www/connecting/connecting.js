$(function () {

  $("#find").click(function(){
    $(".searchView").css({"display":"block"});
    setTimeout(function(){
      $(".searchView").css({"transform":"translateX(0)"});
      $(".btnbk img").attr("src","img/back.svg");
      $(".btnbk ").removeClass("back");
      $(".btnbk ").addClass("cancel2");
    }, 100);
  });

  $("#friends").click(function(){
    $(".friendsView").css({"display":"block"});
    setTimeout(function(){
      $(".friendsView").css({"transform":"translateX(0)"});
      $(".btnbk img").attr("src","img/back.svg")
      $(".btnbk ").removeClass("back")
      $(".btnbk ").addClass("cancel2")
    }, 100);
  });

  $(".request").click(function(){
    $(".requestsView").css({"display":"block"});
    setTimeout(function(){
      $(".requestsView").css({"transform":"translateX(0)"});
      $(".btnbk img").attr("src","img/back.svg")
      $(".btnbk ").removeClass("back")
      $(".btnbk ").addClass("cancel2")
    }, 100);
  });

  $(".btnbk").click(function(){
      var x = $(this).attr("class")+""
      var y = x.split(" ")[1]
      if(y==("cancel2")){
      $(".view").css({"transform":"translateX(800px)"});
      setTimeout(function(){
        $(".view").css({"display":"none"});
        $(".btnbk ").addClass("back");
        $(".btnbk ").removeClass("cancel2");
      }, 800);
        $(".btnbk img").attr("src","../Memory/img/home.svg");
      } else {
        window.location = "../Home/home.html"
      }
  });
  function addToSearchContent(username,url,uid){
    var  FindHtml = "<li><div class=\"theUser\"><div class=\"userImage\"><img src="+url+" />"
      +  "</div><div class=\"usernameOfuser\">"+ username +"</div></div>"
      +  "<div class=\"AddFriend k\" uid = '"+uid+"'>Add</div></li>"
    $(".searchView .content").append(FindHtml);
    requested();
  }
  function requested(){
    var ID = firebase.auth().currentUser.uid;
    var users = database.ref().child('users');
    var bool = false;
    users.child(ID).once("value",function(user){
      var RequestID = user.child("SentRequests").val();
      //alert(RequestID);
      if(RequestID !=null){
        RequestID.forEach(function(snap){
          var Req2 = (snap+"").split(" ")[0]
          database.ref().child('requests').child(Req2).once("value",function(snapshot3){
            var uid2 = snapshot3.child("to").val()
              $(".k[uid*="+uid2+"]").removeClass("AddFriend")
              $(".k[uid*="+uid2+"]").html("Requested")
              $(".k[uid*="+uid2+"]").addClass("requested")
          });
        });
      }
    });
  }
  $('#searchsubmit').click(function() {
    var usernametosearch = $('#search').val();
    $(".searchView .content").html("");
    database.ref().child('users').child('usernames').child(usernametosearch).once('value', function(useruidSnap) {
      var useruid = useruidSnap.val()+'';
      if(useruid) {
        addToSearchContent(usernametosearch,"../Home/img/test.jpg", useruid);
      }
    });
  });

  $('#cancelsearch').click(function() {
    $('#search').val("");
    $(".searchView .content").html("");
    var users = database.ref().child('users');
    users.on("child_added",function(user){
      addToSearchContent(user.child("username").val(),"../Home/img/test.jpg",user.child("uid").val());
    });
  });

  $(document).on('click tap', '.k', function(){
    $(this).removeClass("AddFriend");
    $(this).html("Requested");
    $(this).addClass("requested");
  });

  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    var username;
    var userInDatabase = database.ref().child('users').child(user.uid).child("username");
    userInDatabase.once('value',function(snapshot){
      $('#title p').html(snapshot.val());
      database.ref().child('users').child(user.uid).child('friends').on('child_added', function(friendSnap) {
        //alert(friendSnap.val());
        database.ref().child('users').child(friendSnap.val()).child('friends').on('child_added', function(ffriendSnap) {
          database.ref().child('users').child(ffriendSnap.val()).once('value', function(userSnap) {
            $('.people').append("<div class=\"person\" id=\""+userSnap.key+"\">  <div class=\"icon\">"
                + "<img src=\"../Home/img/test.jpg\" alt=\"\" />"
                + "</div><div class=\"nameOfperson\">"+userSnap.child('username').val()+"</div></div>");
          });
        });
      });
    });
  });

});
