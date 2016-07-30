$(function(){



  var uid1 = 0;


firebase.auth().onAuthStateChanged(function(user) {
  var userID = firebase.auth().currentUser.uid;
  var username;
  database.ref().child('users').child(userID).on("value",function(user1) {
    username = user1.child('username').val();
    var fullname
    if(user1.child('firstName').val() != null && user1.child('lastName').val()!=null ){
       fullname = user1.child('firstName').val()+" "+user1.child('lastName').val();


    }else if(user1.child('firstName').val() != null){
      fullname = user1.child('firstName').val();


    }else if(user1.child('lastName').val() != null){
      fullname = user1.child('lastName').val();


    }else{
      fullname=user1.child('email').val();

    }

    $(".name").html(fullname);
    $("#title ").html(user1.child("username").val());
    //alert(user1.child('profilephoto').val());
    $('.info .photo img').attr('src',user1.child('profilephoto').val());
    var users = database.ref().child('users');
    //database.ref().child('users').child(user.uid).child('friends')
    <!--NOTE to add useres in find!!-->
    /*users.on("child_added",function(user){
      if(user.key!="usernames")
      addToSearchContent(user.child("username").val(),"../Home/img/test.jpg",user.child("uid").val());
    });*/
  });
  // acceptinh the request reject btnreq
  $(document).on('tap ', '.accept', function() {
    var uid = $(this).attr("uid");
    var reqkey = $(this).attr('rel');

    database.ref().child('users').child(userID).once("value",function(user){
      var num = user.child("friends").numChildren();
      database.ref().child('users').child(userID).child("friends").child(num).set(uid);
    });
    database.ref().child('users').child(uid).once("value",function(user){
      var num = user.child("friends").numChildren();
      database.ref().child('users').child(uid).child("friends").child(num).set(userID);
    });

    $("li[uid="+uid+"] .reject").css({"display":"none"})
    $("li[uid="+uid+"] .accept").css({"background-color":"#009688"});
    $("li[uid="+uid+"] .accept").html("Friends");
    $("li[uid="+uid+"] .btnreq").removeClass("accept");
    $("li[uid="+uid+"] .btnAccept").prepend("<div class='btnreq' style='opacity:0'></div>");




    database.ref().child('users').child(userID).child('ReceivedRequests').on("child_added", function(requestKeySnap){
      if(reqkey==requestKeySnap.val()){
        database.ref().child('users').child(userID).child('ReceivedRequests').child(requestKeySnap.key+'').set("done")
      }
    });
    database.ref().child('users').child(uid).child('SentRequests').on("child_added", function(requestKeySnap){
      if(reqkey==requestKeySnap.val()){
        database.ref().child('users').child(uid).child('SentRequests').child(requestKeySnap.key+'').set("done");
      }
    });



      var notificationkey = database.ref().child('notifications').push();
      notificationkey.set({
        subject: user.uid,
        notified: uid,
        subjectname: username,
        type: "accepted",
        checked: "false"
      });
      var notificationsnum;
      database.ref().child('users').child(uid).child('notifications').once('value', function(notificationsSnap){
        notificationsnum = notificationsSnap.numChildren();
      }).then(function(){
        database.ref().child('users').child(uid).child('notifications').child(notificationsnum).set((notificationkey+'').split('/').pop());
      });
  });

  $(document).on('click ', '.reject', function() {
    var uid = $(this).attr("uid");
    var reqkey = $(this).attr('rel');
    $("li[uid="+uid+"]").css({"display":"none"});
    database.ref().child('users').child(userID).child('ReceivedRequests').on("child_added", function(requestKeySnap){
      alert(requestKeySnap.key);
      if(reqkey==requestKeySnap.val()){
        database.ref().child('users').child(userID).child('ReceivedRequests').child(requestKeySnap.key+'').set("Done")
      }
    });
  });
  $('#friends').click(function(){
    var user = firebase.auth().currentUser;
    database.ref().child('users').child(user.uid).child("friends").on('child_added', function(childSnap){
      var frienduid = childSnap.val();
      database.ref().child('users').child(frienduid).once('value', function(userSnap){
        var name = userSnap.child('username').val();
        var photourlprofile = userSnap.child('profilephoto').val();
        $('.Friendcontent').append("<li uid=\""+frienduid+"\"><div class=\"theFriend\"><div class=\"friendImage\"><img src=\""+photourlprofile+"\" alt=\"\" /></div><div class=\"friendnameOfuser\">"+name+"</div></div></li>");
      });
    });
  });

  // updating the number of requests

  database.ref().child('users').child(userID).on("value",function(user){
    $("#num").html(user.child("ReceivedRequests").numChildren()-user.child("requestsCheck").val());
  });


  database.ref().child('users').child(userID).child('ReceivedRequests').on('child_added', function(reqIDSnap) {
    var id = reqIDSnap.val();
    var From;
    var username;
    var uid;
    var url;
    if(id != "done"){
      database.ref().child('requests').child(id+'').once('value', function(requestSnap){
        From = requestSnap.child("from").val();
      }).then(function(){
        database.ref().child('users').child(From+'').once("value",function(user3){
          var username = user3.child("username").val();
          var uid = user3.child("uid").val();
          var url = user3.child('profilephoto').val();
          AddRequets(username,url,uid,id);
        });
      });

    }

  });
});



//sending requests
  $(document).on('click tap', '.AddFriend', function() {
    var requestID = database.ref().child('requests').push();
    var From = firebase.auth().currentUser.uid;
    var to = $(this).attr("uid");
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
  });







  function addToSearchContent(username,url,uid){

    var  FindHtml = "<li>"+
      "<div class=\"theUser\">"
      +
        "<div class=\"userImage\">"
        +
          "<img src="+url+" />"
          +

        "</div>"

        +
        "<div class=\"usernameOfuser\">"
        +
          username
          +
          "</div>"
        +
      "</div>"
      +
      "<div class=\"AddFriend k\" uid = '"+uid+"'>"
      +
        "Add"
        +
      "</div>"
  +
    "</li>"

    $(".searchView .content").append(FindHtml);
    var ID = firebase.auth().currentUser.uid;
    var users = database.ref().child('users');
    var bool = false;
    users.child(ID).once("value",function(user){
    if(jQuery.inArray(uid,user.child("friends").val())!=-1){
      $(".k[uid*="+uid+"]").removeClass("AddFriend")
      $(".k[uid*="+uid+"]").html("Friends")
      $(".k[uid*="+uid+"]").addClass("friends2")
    }
  })
    requested();
  }
});


// checking if user already sent a request to this user or not
function requested(){
  //$(".AddFriend").each(function(i){

    //var uid1 = $(this).attr("uid")

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
//})
}

function AddRequets(username,url,uid,req) {
  var html = "<li uid="+uid+"  >"
  +
    "<div class=\"theUser\">"
    +

      "<div class=\"userImage\">"
      +

        "<img src="+url+" />"

+
      "</div>"
+

      "<div class=\"usernameOfuser\">"
      +

        username
        +

      "</div>"
      +


    "</div>"
    +
    "<div class=\"btnAccept\">"
    +
      "<div class=\"accept btnreq\" uid="+uid+" rel="+req+""+">"
        +
        "Accept"
        +

      "</div>"
      +
      "<div class=\"reject btnreq\"  uid="+uid+" rel="+req+""+">"
      +
        "Reject"
        +
        "  </div>"
      +
"</div>"
    +
  "</li>"

  $(".requestsSent").append(html);

}
