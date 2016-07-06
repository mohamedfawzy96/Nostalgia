$(function () {
  $username = $("#usernameSet input");
  $name = $("#nameSet input");
  $save = $(".save");
  $changephoto = $(".change");

  $("#settings").click(function(){
    $(".settingsView").css({"display":"block"});
    setTimeout(function(){
      $(".settingsView").css({"transform":"translateX(0)"});
      $(".btnbk img").attr("src","img/back.svg")
      $(".btnbk ").removeClass("back")
      $(".btnbk ").addClass("cancel2")
    }, 100);
  });
  var userInDatabase;
  var user;
  firebase.auth().onAuthStateChanged(function(user) {
    user = firebase.auth().currentUser;
    userInDatabase= database.ref().child('users').child(user.uid);

    userInDatabase.once('value',function(snapshot) {
      $username.val(snapshot.child('username').val());
      $name.val(snapshot.child('name').val());
      if(snapshot.child('facebook').val()=="true"){
        $('.facebookC').html("Connected");
      } else {
        $('.facebookC').html("Disconnected");
      }
    });
  });

  $save.click(function() {
    database.ref().child('usernames').child($username.val()+'').once('value', function(usernameSnap) {
      if(usernameSnap.val()!=null) {
        alert('this usernamealready exists'+usernameSnap.val());
      } else {
        userInDatabase.child('username').once('value', function(oldusernameSnap) {
          database.ref().child('usernames').child(oldusernameSnap.val()).remove(function() {
            userInDatabase.child('username').set($username.val());
            user = firebase.auth().currentUser;

            database.ref().child('usernames').child($username.val()).set(user.uid+'');
          });
        });


      }
    })
    userInDatabase.child('name').set($name.val());
  });



});
