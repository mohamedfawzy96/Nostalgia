


var height = $(".card").height() + $(".head").height() + $(".interactions").height() + 25 + 20 + 10
var fullheight = $(window).height();
var chatHeight = fullheight - height;
$(".chat").height(chatHeight)
var widthHeight = -($("input").height()/2);
$(".send1").css({"line-height":($(".send1").height()/2)+"px"});



$(function(){
  $('#message').val('');
  var currurl = document.URL;
  var splittingurl = currurl.split("=");
  var imguid = splittingurl.pop();
  var imgurl="hello";
  var repostsnum = 0;
  var membersnum = 0;
  database.ref().child("memories").child(imguid).once('value', function(memorysnap){
    imgurl = memorysnap.child("url").val();
    repostsnum = memorysnap.child("reposts").val();
    membersnum = memorysnap.child("members").numChildren();
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
    database.ref().child("memories").child(imguid).child("comments").once('child_added',function(commentid){
      //alert(commentid.val());
      var cmntid = commentid.val();
      database.ref().child("comments").child(cmntid).once('value',function(commentSnap){
        var useridnow = commentSnap.child("user").val();
        database.ref().child("users").child(useridnow).once('value',function(usersnap){
          var usernamenow = usersnap.child('username').val();
          var cmntdatanow = commentSnap.child("data").val();
          $('#chattingbody').append("<li id=\"new\"> <div class=\"2\" ID=\"userInChat\">"+usernamenow+
          " </div>  <div ID=\"userMessage\">"+cmntdatanow+" </div> </li>");
        });
      });
    });

  $(".send1").click(function(){
    var user = firebase.auth().currentUser;
    var users = database.ref().child("users");
    var username;
    var userInDatabase = users.child(user.uid).child("username");
    userInDatabase.once('value',function(snapshot){
      username = snapshot.val();
    });
    var cmntdata = $('#message').val();
    var newcomment = new Comment((users.child(user.uid)+"").split("/").pop(), cmntdata);
    var key = database.ref().child("comments").push();
    key.set(newcomment);
    database.ref().child("memories").child(imguid).once('value', function(usersnap){
      var num = usersnap.child("comments").numChildren();
      var keytoadd = (key+'').split("/").pop();
      database.ref().child("memories").child(imguid).child("comments").child(num).set(keytoadd);

    }).then(function(){
      $('#chattingbody').append("<li id=\"new\"> <div class=\"2\" ID=\"userInChat\">"+username+" </div>  <div ID=\"userMessage\">"+cmntdata+" </div> </li>");

      var target = $('#new');
      $('#message').val('');
      /*if( target.length ) {
          $('html, body').animate({
              scrollTop: target.offset().top
          }, 1000);
      };*/
    });
  });
});
//$("input").css({"margin-top":widthHeight+"px"});
