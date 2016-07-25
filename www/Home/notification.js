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
    $('#notificationscontent').html("");
    database.ref().child('users').child(useruid+'').child('notifications').orderByKey().on('child_added', function(notificationkeySnap) {
      var notificationKey = notificationkeySnap.val();
      //alert(notificationKey)
      var subjectname;
      var action;
      var uidtoadd;
      var str;
      var url;
      var checked;
      database.ref().child('notifications').child(notificationKey).once('value', function(notificationsnap) {
        subjectname = notificationsnap.child('subjectname').val();
        checked = notificationsnap.child('checked').val();
        //alert(subjectname);
        action = notificationsnap.child('type').val();
        switch(action){
          case "commented": str ="on your memory";
          uidtoadd = notificationsnap.child('memoryid').val();
          break;
          case "posted": str = "an old memory";
          uidtoadd = notificationsnap.child('memoryid').val();
          break;
          case "reposted": str = "your memory";
          uidtoadd = notificationsnap.child('memoryid').val();
          break;
          case "accepted": str = "you as an old friend";
          uidtoadd = notificationsnap.child('subject').val();
          break;
        }
        //alert(type);
      }).then(function() {
        database.ref().child('memories').child(uidtoadd).once('value', function(memorySnap){
          url = memorySnap.child('url').val();
        }).then(function(){
          if(action=="accepted"){
            /*database.ref().child('users').child(subject).child('profilephoto').once('value', function(photourlSnap) {
              url = photourlSnap.val();
            }).then(function() {
              alert(url)
            })*/
            url = "img/test.jpg";
          }
          $('#notificationscontent').prepend("<li key=\""+notificationKey+"\" checked=\""+checked+"\" class=\"notificationspecialclass\" type='"+action+"' uid='"+uidtoadd+"'>"
          +  "<div class=\"icon5\" style=\"background-image: url("+url+")\">"
          +    "<div class=\"filter5\">"
          +    "</div>"
          +    "<img src=\"../Memory/img/repost.svg\" alt=\"\" />"
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
