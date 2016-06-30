$(function() {
  $(".back6").click(function(){
      $(".notifications").css({"transform":"translateX(2000px)"});
  });


  $("#Search").click(function(){
    $('#notificationscontent').html("");
    database.ref().child('users').child(firebase.auth().currentUser.uid).child('notifications').on('child_added', function(notificationkeySnap) {
      var notificationKey = notificationkeySnap.val();
      alert(notificationKey)
      //alert(notificationKey)
      var subjectname;
      var action;
      var uidtoadd;
      var str;
      var url;
      database.ref().child('notifications').child(notificationKey).once('value', function(notificationsnap) {
        subjectname = notificationsnap.child('subjectname').val();
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
            url = "img/test.jpg";
          }
          $('#notificationscontent').append("<li class=\"notificationspecialclass\" type='"+action+"' uid='"+uidtoadd+"'>"
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
