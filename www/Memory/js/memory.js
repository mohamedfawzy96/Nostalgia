

var height = $(".mcard").height() + $(".mhead").height() + $(".minteractions").height() + 25 + 20 + 10
var fullheight = $(window).height();
var chatHeight = fullheight - height;
$(".mchat").height(chatHeight)
var widthHeight = -($("input").height()/2);
$(".msend1").css({"line-height":($(".msend1").height()/2)+"px"});


$(window).load(function(){
  /*alert('loaded');
  var user = firebase.auth().currentUser;
  var users = database.ref().child("users");
  var username;
  var userInDatabase = users.child(user.uid).child("username");
  userInDatabase.once('value',function(snapshot){
    username = snapshot.val();
  });*/
});
//turned it into a function so every time the memoryview open it updates the value
function UpdateImageView(imageuid1){
  $('#message').val('');
  var currurl = document.URL;
  var splittingurl = currurl.split("=");
  var imguid = imageuid1
  var imgurl="hello";
  var repostsnum = 0;
  var membersnum = 0;
  database.ref().child("memories").child(imguid).once('value', function(memorysnap){
    imgurl = memorysnap.child("url").val();
    repostsnum = memorysnap.child("reposts").val();
    membersnum = memorysnap.child("members").numChildren();
    $(".mimg img").attr("src",imgurl)
    $('#title p').text(memorysnap.child('owner').val());
    $('#owner').text(memorysnap.child('owner').val()+" just shared a memory");
    $('#date').text(memorysnap.child("date").val());
    if(memorysnap.child('caption').val()==""){
      $('#caption').text("no caption");
    }else{
      $('#caption').text(memorysnap.child('caption').val());
    }
  }).then(function(){
    $('#image').attr('src',imgurl);
    $('#numReposts').text(repostsnum);
    $('#numMembers').text(membersnum);
  });
  $('#chattingbody').text("");
    database.ref().child("memories").child(imguid).child("comments").on('child_added',function(commentid){
      //alert(commentid.val());
      var cmntid = commentid.val();
      database.ref().child("comments").child(cmntid).once('value',function(commentSnap){
        var useridnow = commentSnap.child("user").val();
        database.ref().child("users").child(useridnow).once('value',function(usersnap){
          var usernamenow = usersnap.child('username').val();
          var cmntdatanow = commentSnap.child("data").val();
          $('#chattingbody').append("<li id=\"new\"> <div class=\"m2\" ID=\"userInChat\">"+usernamenow+
          " </div>  <div ID=\"userMessage\">"+cmntdatanow+" </div> </li>");

          $('#chattingbody').scrollTop(1000000);

        });
      });
    });


  var qsParm = new Array();
  var ImageUid;
  function qs() {
      var query = window.location.search.substring(1);
      var parms = query.split('&');
      for (var i=0; i < parms.length; i++) {
          var pos = parms[i].indexOf('=');
          if (pos > 0) {
              var key = parms[i].substring(0, pos);
              var val = parms[i].substring(pos + 1);
              qsParm[key] = val;
              ImageUid = qsParm[key];

          }
      }
  };
  qs();

  $('#repost').click(function(){
    var user = firebase.auth().currentUser;
    var users = database.ref().child("users");
    var username;
    var owneruid = "";
    var userInDatabase = users.child(user.uid).child("username");
    userInDatabase.once('value',function(snapshot){
      username = snapshot.val();
    });
    var repostsnum;
    database.ref().child("memories").child(imguid).once('value', function(memorysnap){
      repostsnum = memorysnap.child("reposts").val();
      owneruid += memorysnap.child('owneruid').val();
    }).then(function(){
      var newrepostsnum = repostsnum + 1;
      database.ref().child("memories").child(imguid).child("reposts").set(newrepostsnum);
      $('#numReposts').text(newrepostsnum);
      var repostednum;
      users.child(user.uid).child("reposted").once('value', function(repostedsnap){
        repostednum = repostedsnap.numChildren();
      }).then(function(){
        users.child(user.uid).child("reposted").child(repostednum).set(imguid);
      });
      var notificationkey = database.ref().child('notifications').push();
      notificationkey.set({
        subject: user.uid,
        subjectname: username,
        notified: owneruid,
        memoryid: imguid,
        type: "reposted"
      });
      var notificationsnum;
      database.ref().child('users').child(owneruid).child('notifications').once('value', function(notificationsSnap){
        notificationsnum = notificationsSnap.numChildren();
      }).then(function(){
        database.ref().child('users').child(owneruid).child('notifications').child(notificationsnum).set((notificationkey+'').split('/').pop());
      });
    });

  });




};
//$("input").css({"margin-top":widthHeight+"px"});
