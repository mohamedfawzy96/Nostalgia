$(function() {
  //////////////
  //this should be done when the signup is done finished correctly
  //$(".codeview").css({"transform":"translateX(0px)"})
  ///////////////
  //this should be done when the code given is right
  //$(".codeview").css({"transform":"translateX(-1000px)"})
  //$(".people").css({"transform":"translateX(0)"})
  //////////////

  $(".yes").click(function() {
    var useruid = $('.explain').attr('useruid');
    var codedata = $('#codeinput').val();
    if(codedata==null||codedata=="") {
      alert('no code entered!')
    } else {
      var users = new Array();
      var usersnum;
      var flag;
      database.ref().child('code').child(codedata).once('value', function(codeSnap) {
        usersnum = codeSnap.numChildren()-1;
        flag = codeSnap.child('flag').val();
        if(flag==true) {
          codeSnap.forEach(function(snap) {
            if(snap.key!="flag") {
              users.push(snap.val());
            }
          });
        } else {
          alert('the code doesn\'t exist');
        }
      }).then(function() {
        if(flag==true) {
          database.ref().child('code').child(codedata).child(usersnum).set(useruid);
          $(".filterspin").hide();
          $(".codeview").css({"transform":"translateX(-1000px)"})
          $(".people").css({"transform":"translateX(0)"})
          if(users.length>0) {
            fillusers(users, 0);
          } else {
            alert('no users found!');
          }
        }
      });
    }
  });
  $(".no").click(function(){
    window.location = "Home/home.html?somval="+"true";
  });
  $(".peopledone").click(function(){
    window.location = "Home/home.html?somval="+"true";
  });
  var fillusers = function(usersarray, i) {
    if(i<usersarray.length) {
      var usernowid = usersarray[i];
      var picurl;
      var name;
      database.ref().child('users').child(usernowid).once('value', function(usersnap) {
        picurl = usersnap.child('profilephoto').val();
        name = usersnap.child('username').val();
      }).then(function() {
        var str = "<li uid=\""+usernowid+"\"><div class=\"theUser\"><div class=\"userImage\"><img src=\""+picurl+"\"/>"
                  +    "</div><div class=\"usernameOfuser\">"+name+"</div></div>"
                  +      "<div class=\"AddFriend k\" uid =\""+usernowid+"\">Add</div>"
                  +      "</li>";
        $('.peoplecontent').append(str);
        fillusers(usersarray,++i);
      });
    }
  }

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
    $(this).removeClass("AddFriend");
    $(this).html("Requested");
    $(this).addClass("requested");
  });

});
