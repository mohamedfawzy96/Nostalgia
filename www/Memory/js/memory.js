
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
function updateprof(id) {
  $(".k").addClass("AddFriend")
  $(".k").removeClass("requested")
  $(".k").removeClass("friends2")
  $(".k").html("Add")
  database.ref().child("users").child(id).once("value",function(userprof){
    var user = firebase.auth().currentUser;
    var curridu = user.uid;
    var profname
    if(userprof.child("firstName").val() != null && userprof.child("lastName").val()!=null ){
      profname = userprof.child("firstName").val()+" "+userprof.child("lastName").val()
    }else{
      profname = userprof.child("email").val()
    }
    $(".profname").html(profname)
    $(".profuser").html(userprof.child("username").val())
    $(".prof img").attr("src",userprof.child("profilephoto").val())
    database.ref().child("users").child(curridu).once("value",function(userprof2){
      var req = userprof2.child("SentRequests").val()
      if(req != null){


      req.forEach(function(first){
        if(first != "done"){
          database.ref().child("requests").child(first).once("value",function(reque){
            if(reque.child("to").val()==id){
              $(".k").removeClass("AddFriend")
              $(".k").addClass("requested")
              $(".k").html("Requested")

            }

          })
        }



      })
      }



      if(jQuery.inArray(id,userprof2.child("friends").val())!=-1){
        $(".k").removeClass("AddFriend")
        $(".k").removeClass("requested")

        $(".k").addClass("friends2")
        $(".k").html("Friends")
      }
      if(curridu == id){
        $(".k").css({"opacity":"0"})

      }else{
        $(".k").css({"opacity":"1"})


      }


    })







  })

}
function UpdateImageView(imageuid1,oneTime){
  $('#message').val('');
  var currurl = document.URL;
  var splittingurl = currurl.split("=");
  var imguid = imageuid1
  var imgurl="hello";
  var repostsnum = 0;
  var membersnum = 0;
  $(".msend12").attr("imguid",imguid)

  database.ref().child("memories").child(imguid).once('value', function(memorysnap){
    imgurl = memorysnap.child("url").val();
    repostsnum = memorysnap.child("reposts").val();
    membersnum = memorysnap.child("members").numChildren();
    if(memorysnap.child("members").val()==null){
    $("#membersicon").attr("members","false")
  }else{
    $("#membersicon").attr("members","true")


  }
    var effect2 = memorysnap.child("effect").val();
    var eff0 = effect2.indexOf("1990")
    var eff1 = effect2.indexOf("1980")
    var eff2 = effect2.indexOf("1970")
    $(".photo").css({"-webkit-filter":"grayscale(0)"})
    $(".photo .filterpho2").css({"background-color":"rgba(0,0,0,0)"})
    if(eff1 != -1){
      $(".photo .filterpho2").css({"background-color":"#FBB03B"})
    }
    if(eff0 != -1){
      $(".photo .filterpho2").css({"background-color":"#ED1E79"})
    }
    if(eff2 != -1){
      $(".photo").css({"filter":"grayscale(100%)"})
      $(".photo").css({"-webkit-filter":"grayscale(100%)"})
        }
    var ori = memorysnap.child("ori").val()

    var photo = $('.photo img')
    photo.css({"transform":"rotate(0)"})
    //alert("hi")
    //$(".expand img").css({"transform":"rotate(180deg)"})

    //$('.photo img').css({"transform":"rotate(180deg)"})




    /*switch(ori){
case 2:
    //ctx.scale(-1, 1);
    break;
case 3:
    // 180° rotate left
    photo.css({"transform":"rotate(-180deg)"})
    break;
case 4:
    // vertical flip
    break;
case 5:
    // vertical flip + 90 rotate right
    //photo.css({"width":"rotate(90deg)"})
    photo.css({"transform":"rotate(90deg)"})

    break;
case 6:
    // 90° rotate right
    $('.photo img').css({"transform":"rotate(-90deg)"})


    break;
case 7:
    // horizontal flip + 90 rotate right

    photo.css({"transform":"rotate(90deg)"})

    break;
case 8:
    // 90° rotate left

    photo.css({"transform":"rotate(-90deg)"})
    break;
}*/

    $(".mimg img").attr("src",imgurl)
    $('#title p').text(memorysnap.child('owner').val());
    var type1
    if(memorysnap.child('private').val()){
      type1 = "private"
    }else{
      type1 = "Public"

    }
    $('#owner').text(memorysnap.child('owner').val()+" shared a memory");
    $('#date').text(memorysnap.child("date").val());
    database.ref().child('usernames').child(memorysnap.child('owner').val()).once('value', function(useruidnow) {
      var useruidstr = useruidnow.val();
      database.ref().child('users').child(useruidstr+'').once('value', function(userSnap) {
        $('.mimgMemory').attr("id",useruidstr)
        $('.mimgMemory').attr('src',userSnap.child('profilephoto').val())
      })
    })
    if(memorysnap.child('caption').val()==""){
      $('#caption').text("no caption");
    }else{
      $('#caption').text(memorysnap.child('caption').val());
    }
  }).then(function(){
    $('.photo img').attr('src',imgurl);
    $(".photo img").css({"display":"block"})

    //$('#numReposts').text(repostsnum);
    //$('#numMembers').text(membersnum);
    $('#chattingbody2').text("");
    database.ref().child("memories").child(imguid).child("comments").on('child_added',function(commentid){
        //alert(commentid.val());
        var cmntid = commentid.val();

        database.ref().child("comments").child(cmntid).once('value',function(commentSnap){
          var useridnow = commentSnap.child("user").val();
          var cmntdatanow = commentSnap.child("data").val();
          var usernamenow = commentSnap.child("username").val() ;
          var lastchild = $(".memchat li:last-child").attr("cmt")
          //alert(lastchild)

          if(lastchild != cmntid ){
          $('#chattingbody2').append("<li id=\"new\" rel="+useridnow+" cmt="+cmntid+"> <div class=\"m2\" ID=\"userInChat\">"+usernamenow+" </div>  <div ID=\"userMessage\">"+cmntdatanow+" </div> </li>");
        }
          $('#chattingbody2').scrollTop(1000000);
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
        type: "reposted",
        checked: "false"
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
