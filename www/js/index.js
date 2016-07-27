/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    // Application Constructor

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
  //window.location = "Home/home.html";
  var user = firebase.auth().currentUser;
  //alert(user)
  if(user){
    var users = database.ref().child("users");
    var username;
    var userInDatabase = users.child(user.uid).child("username");
    userInDatabase.once('value',function(snapshot){
      username = snapshot.val();
    }).then(function(){
      //alert(username);
      if(username!=null){

        window.location = "Home/home.html?somval="+"true";
      }
    });
  };

$(function(){
  //database.ref().child("users").child(currentUserId).child("firstfb").set(null)

  //window.location = "Home/home.html?somval="+"true";

   document.addEventListener('deviceready', this.onDeviceReady, false);
    $(".Signup").click(function(){
      $('#sigin').id = "signup";
      $(this).css({"color":"#ec4b57"})
      $(this).css({"border-bottom":"8px solid #ec4b57"})
      $(".Signin").css({"color":"white"})
      $(".Signin").css({"border-bottom":"0"})
      $(".RightDiv").css({"left":"0"})
      $(".LeftDiv").css({"display":"none"})
      $(".RightFooter").css({"left":"0"})
      $(".LeftFooter").css({"display":"none"})
    });

    $(".Signin").click(function(){
      $('#signup').id = "sigin";
      $(this).css({"color":"#ec4b57"})
      $(this).css({"border-bottom":"8px solid #ec4b57"})
      $(".Signup").css({"color":"white"})
      $(".Signup").css({"border-bottom":"0"})
      $(".RightDiv").css({"left":"100%"})
      $(".LeftDiv").css({"display":"block"})
      $(".RightFooter").css({"left":"100%"})
      $(".LeftFooter").css({"display":"block"})
    });


    $('#signup').click(function(){
      $(".filterspin").css({"display":"flex"})

      var email = $('#emailup').val();
      var password = $('#passwordup').val();
      var currusername = $('#usernameup').val();


      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
          var user = firebase.auth().currentUser;
          if (user) {
            var newuser = new User(user.email, user.uid, currusername, [], [], [], [], [], [], null);

            usersRef.child(user.uid).set(newuser);
            database.ref().child('usernames').child(currusername).once('value', function(usernameSnap) {
              if(usernameSnap.val()){
                usersRef.child(user.uid).remove();
                user.delete().then(function() {
                  $(".filterspin").hide()

                  alert('Username is taken by another Accoount');



                }, function(error) {
                  // An error happened.
                  alert(error)
                });

              } else {
                database.ref().child('usernames').child(currusername+'').set(user.uid);
                window.location = "Home/home.html?somval="+"true";
              }
            });
          } else {
            alert('null user!!');
          }
        }).catch(function(error) {
          $(".filterspin").hide()

            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            if (errorCode == 'auth/weak-password') {
              //alert('The password is too weak.');
            } else {
              console.error(error);
            }
          });
      }).catch(function(error) {
        $(".filterspin").hide()

          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          if (errorCode == 'auth/weak-password') {
          } else {
            console.error(error);
          }
        });
      $('#signuppage').hide();
      $('#signinpage').show();
    });

    $('#signin').click(function(){
      $(".filterspin").css({"display":"flex"})

      //alert('sign in y walaaa');
      var email = $('#emailin').val();
      var password = $('#passwordin').val();
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
          //alert('signed in');
          var user = firebase.auth().currentUser;
          if (user) {
            //alert('user exists and signed in '+user.email);
            usersRef.on('value', function(snapshot){
              snapshot.forEach(function (childSnapshot){
                //alert(childSnapshot.child("email").val());
                if(childSnapshot.child("uid").val()==user.uid){
                  var currUser = childSnapshot;
                  var currUserEmail = childSnapshot.child("email").val();
                  var currUserUid = childSnapshot.child("uid").val();
                    //alert('found your user '+currUserEmail+"/"+currUserUid);
                  }
                  else{
                    //alert('not this one '+childSnapshot.child("email").val());
                  }
                });
              });
              window.location = "Home/home.html?somval="+"true";
          } else {
            alert('null user!!');
          }
        }).catch(function(error) {
          $(".filterspin").hide()

        //alert('first '+ error);
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              console.error(error);
            }
          });
    });

    function initApp() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          alert('signed in');
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var refreshToken = user.refreshToken;
          var providerData = user.providerData;

        } else {
          alert('not signed in');
        }
      });
    };

    $('#facebookbtn').click(function(){
        var auth = firebase.auth();
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function(result){
        var uid = result.user.uid;
      }).catch(function (error){
        alert("failed");
        alert(error);
      });

    });
});
