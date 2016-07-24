$(function () {

  $("#find").click(function(){
    $(".searchView").css({"display":"block"});
    setTimeout(function(){
      $("#title").html("Find");

      $(".searchView").css({"transform":"translateX(0)"});
      $(".btnbk img").attr("src","img/back.svg");
      $(".btnbk ").removeClass("back");
      $(".btnbk ").addClass("cancel2");
    }, 100);
  });

  $("#friends").click(function(){
    $(".friendsView").css({"display":"block"});
    setTimeout(function(){
      $(".friendsView").css({"transform":"translateX(0)"});
      $("#title").html("Friends");

      $(".btnbk img").attr("src","img/back.svg")
      $(".btnbk ").removeClass("back")
      $(".btnbk ").addClass("cancel2")

    }, 100);
  });

  $(".change").click(function(){
    $("#changepho").trigger("click")
  })
var file;
  $("#changepho").change(function () {

  		var photo = $('.fot img')

  	    //alert(jQuery(this).val());
  	   	//alert(file);
  	   	readURL(this);
  	});
  	function readURL(input) {
  	    if (input.files && input.files[0]) {
  	        var reader = new FileReader();
  	        reader.onload = function (e) {
  				$('.changePhoto img').attr("src", e.target.result);
  	        }
  	        reader.readAsDataURL(input.files[0]);
  	    }
  	}




  //// settings area


  $(".request").click(function(){
    $(".requestsView").css({"display":"block"});
    setTimeout(function(){
      $(".requestsView").css({"transform":"translateX(0)"});
      $(".btnbk img").attr("src","img/back.svg")
      $(".btnbk ").removeClass("back")
      $(".btnbk ").addClass("cancel2")
    }, 100);
  });

  $(".btnbk").click(function(){
      var x = $(".btnbk img").attr("src")
      if(x!=("../Memory/img/home.svg")){
        $(".Friendcontent ").html("")

      $(".view").css({"transform":"translateX(800px)"});
      setTimeout(function(){
        //$(".view").css({"display":"none"});
        $(".btnbk ").addClass("back");
        $(".btnbk ").removeClass("cancel2");
      }, 800);
        $(".btnbk img").attr("src","../Memory/img/home.svg");
      } else {
        window.location = "../Home/home.html"
      }
  });
  function addToSearchContent(username,url,uid){
    var  FindHtml = "<li><div class=\"theUser\"><div class=\"userImage\"><img src="+url+" />"
      +  "</div><div class=\"usernameOfuser\">"+ username +"</div></div>"
      +  "<div class=\"AddFriend k\" uid = '"+uid+"'>Add</div></li>"
    $(".searchView .content").append(FindHtml);
    requested();
  }
  function requested(){
    var ID = firebase.auth().currentUser.uid;
    var users = database.ref().child('users');
    var bool = false;
    users.child(ID).once("value",function(user){

      var RequestID = user.child("SentRequests").val();
      //alert(RequestID);
      if(RequestID !=null){
        RequestID.forEach(function(snap){
          var Req2 = (snap+"").split(" ")[0]
          database.ref().child('requests').child(Req2).once("value",function(snapshot3){
            var uid2 = snapshot3.child("to").val()
              $(".k[uid*="+uid2+"]").removeClass("AddFriend")
              $(".k[uid*="+uid2+"]").html("Requested")
              $(".k[uid*="+uid2+"]").addClass("requested")
          });
        });
      }
    });
  }
  $('#searchsubmit').click(function() {
    var usernametosearch = $('#search').val();
    $(".searchView .content").html("");
    database.ref().child('usernames').child(usernametosearch).once('value', function(useruidSnap) {
      var useruid = useruidSnap.val()+'';
      var photourl;
      database.ref().child('users').child(useruid).child('profilephoto').once('value', function(photourlSnap) {
        photourl = photourlSnap.val();
        if(photourl==null) {
          photourl = "../Home/img/test.jpg";
        }
      }).then(function() {
        if(useruid!="null") {
          addToSearchContent(usernametosearch, photourl, useruid);
        } else {
          <!--NOTE no user found!-->
          alert('no user found!');
        }
      });
    });
  });

  $('#cancelsearch').click(function() {
    $('#search').val("");
    $(".searchView .content").html("");
    var users = database.ref().child('users');
    users.on("child_added",function(user){
      addToSearchContent(user.child("username").val(),"../Home/img/test.jpg",user.child("uid").val());
    });
  });

  $(document).on('click tap', '.k', function(){
    $(this).removeClass("AddFriend");
    $(this).html("Requested");
    $(this).addClass("requested");
  });

  /*firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    var username;
    var userInDatabase = database.ref().child('users').child(user.uid).child("username");
    userInDatabase.once('value',function(snapshot){
      $('#title p').html(snapshot.val());
      database.ref().child('users').child(user.uid).child('friends').on('child_added', function(friendSnap) {
        //alert(friendSnap.val());
        database.ref().child('users').child(friendSnap.val()).child('friends').on('child_added', function(ffriendSnap) {
          database.ref().child('users').child(ffriendSnap.val()).once('value', function(userSnap) {
            $('.people').append("<div class=\"person\" id=\""+userSnap.key+"\">  <div class=\"icon\">"
                + "<img src=\"../Home/img/test.jpg\" alt=\"\" />"
                + "</div><div class=\"nameOfperson\">"+userSnap.child('username').val()+"</div></div>");
          });
        });
      });
    });
  });*/
  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
  var people = new Array();
  firebase.auth().onAuthStateChanged(function(user) {
    var user = firebase.auth().currentUser;
    var username;
    var userInDatabase = database.ref().child('users').child(user.uid).child("username");
    userInDatabase.once('value',function(snapshot){
      $('#title').html(snapshot.val());
      database.ref().child('users').child(user.uid).child('friends').on('child_added', function(friendSnap) {
        //alert(friendSnap.val());
        database.ref().child('users').child(friendSnap.val()).child('friends').on('child_added', function(ffriendSnap) {
          database.ref().child('users').child(ffriendSnap.val()).once('value', function(userSnap) {
            people.push({key:userSnap.key, name:userSnap.child('username').val() });
          });
        });
      });
      var repeated = new Array();
      var limit;
      if(people.length>4) {
        limit = 4;
      } else {
        limit = people.length;
      }
      for (i = 0; i < limit;) {
          var pos = Math.floor(Math.random() * people.length);

          if(isInArray(people[pos].key, repeated)==false) {
            $('.people').append("<div class=\"person\" id=\""+people[pos].key+"\">  <div class=\"icon\">"
                + "<img src=\"../Home/img/test.jpg\" alt=\"\" />"
                + "</div><div class=\"nameOfperson\">"+people[pos].name+"</div></div>");
            repeated.push(people[pos].key);
            i++;
          }
      }
    });
  });

});
