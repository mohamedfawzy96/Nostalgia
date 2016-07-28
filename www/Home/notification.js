function checknotifi(){
  var currentUserId = firebase.auth().currentUser.uid;

  database.ref().child("users").child(currentUserId).on("value",function(usernotif){
    var notifarray = usernotif.child("notifications").val()
    var check = usernotif.child("notificationCheck").val()
    if(check!=null){
      if(notifarray != null){
        if(notifarray.length !=check ){
          $(".notif2").css({"display":"flex"})
          var num = notifarray.length - check
          if(num>9){
            $(".notif2").html("9+")


          }else{
            $(".notif2").html(num)


          }

        }

      }

    }else{
      database.ref().child("users").child(currentUserId).child("notificationCheck").set(0)


    }



  })



}

$(function() {


  $(".back6").click(function(){
      $(".notifications").css({"transform":"translateX(2000px)"});
  });

  var useruid;
  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    var username;
    useruid = user.uid;
    var userInDatabase = database.ref().child('users').child(user.uid).child("username");
  });


  $("#Search").click(function(){
    var currentUserId2 = firebase.auth().currentUser.uid;

    database.ref().child("users").child(currentUserId2).on("value",function(usernotif){
      var notifarray = usernotif.child("notifications").val()
      var check = usernotif.child("notificationCheck").val()
      if(check!=null){
        if(notifarray != null){
          if(notifarray.length !=check ){
            database.ref().child("users").child(currentUserId2).child("notificationCheck").set(notifarray.length)
            $(".notif2").hide()

          }

        }

      }



    })
    $('#notificationscontent').html("");
    database.ref().child('users').child(useruid+'').child('notifications').orderByKey().on('child_added', function(notificationkeySnap) {
      var notificationKey = notificationkeySnap.val();
      //alert(notificationKey)
      var subjectname;
      var subject;
      var action;
      var uidtoadd;
      var str;
      var url;
      var checked;
      var icontype;
      database.ref().child('notifications').child(notificationKey).once('value', function(notificationsnap) {
        subjectname = notificationsnap.child('subjectname').val();
        subject = notificationsnap.child('subject').val();
        checked = notificationsnap.child('checked').val();
        //alert(subjectname);
        action = notificationsnap.child('type').val();
        switch(action){
          case "commented": str ="on your memory";
          icontype = "../Memory/img/tag.svg";
          uidtoadd = notificationsnap.child('memoryid').val();
          break;
          case "posted": str = "an old memory";
          icontype = "../Memory/img/repost.svg";
          uidtoadd = notificationsnap.child('memoryid').val();
          break;
          case "reposted": str = "your memory";
          icontype = "../Memory/img/repost.svg";
          uidtoadd = notificationsnap.child('memoryid').val();
          break;
          case "accepted": str = "you as an old friend";
          icontype = "../Memory/img/accept.svg";
          uidtoadd = notificationsnap.child('subject').val();
          break;
        }
        //alert(type);
      }).then(function() {
        database.ref().child('memories').child(uidtoadd).once('value', function(memorySnap){
          url = memorySnap.child('url').val();
        }).then(function(){
          if(action=="accepted"){
            database.ref().child('users').child(subject).child('profilephoto').once('value', function(photourlSnap) {
              url = photourlSnap.val();
            }).then(function() {
              console.log(url);
            });
            //url = "img/test.jpg";
          }
          $('#notificationscontent').prepend("<li key=\""+notificationKey+"\" checked=\""+checked+"\" class=\"notificationspecialclass\" type='"+action+"' uid='"+uidtoadd+"'>"
          +  "<div class=\"icon5\" style=\"background-image: url("+url+")\">"
          +    "<div class=\"filter5\">"
          +    "</div>"
          +    "<img src=\""+icontype+"\" alt=\"\" />"
          +  "</div>"
          +  "<div class=\"whatHappen\">"
          +    subjectname+ " <span class=\"color\">"+action+"</span> "+ str
          +  "</div>"
          + "</li>");
        });
      });
    });

    $(".notifications").fadeIn();
    setTimeout(function(){
      $(".notifications").css({"transform":"translateX(0)"});
    },50);
  });

  $(document).on('click ', '.notificationspecialclass', function() {
    database.ref().child('notifications').child($(this).attr('key')).child('checked').set("true");
    if($(this).attr('type')=="accepted"){
      alert('view profile!');
    } else {
      UpdateImageView($(this).attr('uid'));
      $(".mphoto").fadeIn();
      $(".mphoto").addClass("maddedClass");
      $(".mfilter").fadeIn();
      $(".mfullScreen").css({"transform":"translateX(0)"});
    }

  });

});
