$(function(){


  var users = database.ref().child('users');
  var array = new Array();
  users.on("child_added",function(user){
    addToSearchContent(user.child("username").val(),"../Home/img/test.jpg",user.child("uid").val());
  });
  var uid1 = 0;


firebase.auth().onAuthStateChanged(function(user) {
  var userID = firebase.auth().currentUser.uid
  // acceptinh the request reject btnreq
  $(document).on('click ', '.accept', function() {
    var uid = $(this).attr("uid");
    var reqkey = $(this).attr('rel');

    database.ref().child('users').child(userID).once("value",function(user){
      var num = user.child("friends").numChildren();
      database.ref().child('users').child(userID).child("friends").child(num).set(uid);
    });
    $("li[uid="+uid+"]").css({"display":"none"});
    database.ref().child('users').child(userID).child('ReceivedRequests').on("child_added", function(requestKeySnap){
      if(reqkey==requestKeySnap.val()){
        database.ref().child('users').child(userID).child('ReceivedRequests').child(requestKeySnap.key+'').remove(function(){
          //alert('removed');
        });
      }
    });
  });
  $(document).on('click ', '.reject', function() {
    var uid = $(this).attr("uid");
    var reqkey = $(this).attr('rel');
    $("li[uid="+uid+"]").css({"display":"none"});
    database.ref().child('users').child(userID).child('ReceivedRequests').on("child_added", function(requestKeySnap){
      alert(requestKeySnap.key);
      if(reqkey==requestKeySnap.val()){
        database.ref().child('users').child(userID).child('ReceivedRequests').child(requestKeySnap.key+'').remove(function(){
          //alert('removed');
        });
      }
    });
  });
  $('#friends').click(function(){
    var user = firebase.auth().currentUser;
    database.ref().child('users').child(user.uid).child("friends").on('child_added', function(childSnap){
      var frienduid = childSnap.val();
      database.ref().child('users').child(frienduid).once('value', function(userSnap){
        var name = userSnap.child('username').val();
        $('.Friendcontent').append("<li uid=\""+frienduid+"\"><div class=\"theFriend\"><div class=\"friendImage\"><img src=\"../Home/img/test.jpg\" alt=\"\" /></div><div class=\"friendnameOfuser\">"+name+"</div></div></li>");
      });
    });
  });

  // updating the number of requests

  database.ref().child('users').child(userID).once("value",function(user){
    $("#num").html(user.child("ReceivedRequests").numChildren());
  });


  database.ref().child('users').child(userID).child('ReceivedRequests').on('child_added', function(reqIDSnap) {
    var id = reqIDSnap.val();
    var From;
    var username;
    var uid;
    var url;
    database.ref().child('requests').child(id+'').once('value', function(requestSnap){
      From = requestSnap.child("from").val();
    }).then(function(){
      database.ref().child('users').child(From+'').once("value",function(user3){
        var username = user3.child("username").val();
        var uid = user3.child("uid").val();
        var url = "../Home/img/test.jpg";
        AddRequets(username,url,uid,id);
      });
    });
  });
});



//sending requests
  $(document).on('click tap', '.AddFriend', function() {
    var requestID = database.ref().child('requests').push();
    var From = firebase.auth().currentUser.uid
    var to = $(this).attr("uid");

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
