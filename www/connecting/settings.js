$(function () {
  $username = $("#usernameSet input");
  $firstname = $("#firstnameSet input");
  $lastname = $("#lastnameSet input");
  $profilephoto = $(".changePhoto img");


  $save = $(".save");
  $changephoto = $(".change");
  var user1 ;
  var firstname1;
  var Lastname1;
  var connected;
$(".firstnameSet1").click(function(){
  $("#firstnameSet input").trigger("select")
})
$(".usernameSet1").click(function(){
  $("#usernameSet input").trigger("select")
})
$(".lastnameSet1").click(function(){
  $("#lastnameSet input").trigger("select")
})

  $("#settings").click(function(){
    $(".settingsView").css({"display":"block"});
    setTimeout(function(){
      $("#title").html("Settings");

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
      $firstname.val(snapshot.child('firstName').val());
      $lastname.val(snapshot.child('lastName').val());
      $profilephoto.attr("src",snapshot.child('profilephoto').val());


      if(snapshot.child('facebook').val()){
        $('.facebookC').html("Connected");
      } else {
        $('.facebookC').html("Disconnected");
      }
    });
  });

  $save.click(function() {
    $(".filterspin").css({"display":"flex"})
    userInDatabase.once("value",function(user2){
      if(user2.child("username").val() != $username.val() ){



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
      })}

      if(user2.child("firstName").val() != $firstname.val() ){
        userInDatabase.child('firstName').set($firstname.val());
        $(".filterspin").css({"display":"none"})

        }

        if(user2.child("lastName").val() != $lastname.val() ){
          userInDatabase.child('lastName').set($lastname.val());
          $(".filterspin").css({"display":"none"})


          }
          if(user2.child("profilephoto").val() != $profilephoto.attr("src") ){
            var keyss = database.ref().child('keys');
    				var imagekeydif = keyss.push()
            var file = document.getElementById('changepho').files[0];
            var imageRef = storageRef.child('memories/'+imagekeydif);
            var uploadTask = imageRef.put(file);
            uploadTask.on('state_changed', function(snapshot) {
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                  case firebase.storage.TaskState.PROGRESS: // or 'progress'
                    {
                      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                      //$(".filterspin").fadeOut()
                    }
                    break;
                }
          }, function(error) {
              alert(error);
          }, function() {
            $(".filterspin").css({"display":"none"})
            userInDatabase.child('profilephoto').set(uploadTask.snapshot.downloadURL);
            alert("saved")

          }
        )


          }













    })


  });



});
