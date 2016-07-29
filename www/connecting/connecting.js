function updateprof(id) {
  $(".prof").css({"transform":"translateY(0)"})
$(".ff33").show()
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
              $(".k").removeClass("AddFriend2")
              $(".k").addClass("requested2")
              $(".k").html("Requested")

            }

          })

        }



      })
      }



      if(jQuery.inArray(id,userprof2.child("friends").val())!=-1){
        $(".k").removeClass("AddFriend2")
        $(".k").addClass("friends3")
        $(".k").html("Friends")
      }


    })







  })

}
$(".profcancel").click(function(){
  $(".prof").css({"transform":"translateY(1000px)"})
  $(".ff33").fadeOut()
  $(".k").css({"opacity":"1"})



});
$(document).on('tap', '.AddFriend2', function() {
  $(".k").removeClass("AddFriend2")
  $(".k").addClass("requested2")
  $(".k").html("Requested")
  var requestID = database.ref().child('requests').push();
  var From = firebase.auth().currentUser.uid;
  var idu = $(this).attr("uid")
  var to = idu;
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


})
$(function () {
  var ID;
  firebase.auth().onAuthStateChanged(function(user) {
    ID = firebase.auth().currentUser.uid;
    //alert(ID)
  });
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var pcounp = 0;
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

    var friends;
    database.ref().child('users').child(ID+'').child('friends').once('value', function(snap) {
      friends = snap.val();
    }).then(function() {
      if(friends != null && friends.indexOf(uid) >= 0) {
        var  FindHtml = "<li uid="+uid+"><div class=\"theUser\"><div class=\"userImage\"><img src="+url+" />"
          +  "</div><div class=\"usernameOfuser\">"+ username +"</div></div>"
          +  "<div class=\"friends2\" uid = '"+uid+"'>Friends</div></li>"
        $(".searchView .content").append(FindHtml);
        requested();
      } else {
        var  FindHtml = "<li uid="+uid+"><div class=\"theUser\"><div class=\"userImage\"><img src="+url+" />"
          +  "</div><div class=\"usernameOfuser\">"+ username +"</div></div>"
          +  "<div class=\"AddFriend k\" uid = '"+uid+"'>Add</div></li>"
        $(".searchView .content").append(FindHtml);
        requested();
      }
    });


  }
  $(document).on("tap",".requestsSent li",function(){
    updateprof($(this).attr("uid"))
    $(".k").css({"opacity":"0"})
  })
  $(document).on("tap",".person",function(){
    updateprof($(this).attr("id"))
  })
  function requested() {
    ID = firebase.auth().currentUser.uid;
    var users = database.ref().child('users');
    var bool = false;
    users.child(ID).once("value",function(user){
      var RequestID = user.child("SentRequests").val();
      //alert(RequestID);
      if(RequestID !=null){
        RequestID.forEach(function(snap){
          if(snap != "done"){
            var Req2 = (snap+"").split(" ")[0]
            database.ref().child('requests').child(Req2).once("value",function(snapshot3){
              var uid2 = snapshot3.child("to").val()
                $(".k[uid*="+uid2+"]").removeClass("AddFriend")
                $(".k[uid*="+uid2+"]").html("Requested")
                $(".k[uid*="+uid2+"]").addClass("requested")
            });

          }

        });
      }
    });
  }
  $('#searchsubmit').click(function() {
    var usernametosearch = $('#search').val();
    $(".searchView .content").html("");

    if($('#searchsubmit').html()=="Cancel") {
      $('#searchsubmit').html("Search");
      $('#search').val("");
      $('.content').text("");
      //$(".searchView .content").text("");
      $('.content li').hide();
    } else {
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
            $('#searchsubmit').html("Search");
            $('#search').val("");
          }
        });
      });
      if(usernametosearch!="")
      $('#searchsubmit').html("Cancel");
    }
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
    var userInDatabase = database.ref().child('users').child(user.uid);
    userInDatabase.once('value',function(snapshot) {
      $('#title').html(snapshot.child("username").val());
      friends = snapshot.child('friends').val();


    }).then(function() {
      var counterf = 0;
      if(friends != null){
      friends.forEach(function(friend) {
        var ff;
        database.ref().child('users').child(friend).child('friends').once('value', function(ffriends) {
            counterf++;
            ff = ffriends.val();
        }).then(function() {
          ff.forEach(function(fp) {
            people.push(fp);
          });
          if(counterf==friends.length) {
            //alert(people);
            var uniqueArray = new Array();
            people.forEach(function(person) {
              if(uniqueArray.length==0) {
                uniqueArray.push(person);
              } else {
                var dup = false;
                uniqueArray.forEach(function(uniq) {
                  if(person==uniq) {
                    dup = true;
                  }
                });
                if(dup!=true) {
                  uniqueArray.push(person);
                }
              }
            });
            //alert(uniqueArray);
            uniqueArray.forEach(function(qq) {
              var key;
              var picurl;
              var name;
              database.ref().child('users').child(qq).once('value', function(uuu) {
                key = uuu.key;
                picurl = uuu.child('profilephoto').val();
                name = uuu.child('username').val();
              }).then(function() {
                var x = getRandomIntInclusive(0,1);
                if(x==1) {
                  if(friends.indexOf(qq)<0) {
                    if(pcounp<4) {
                      $('.people').append("<div class=\"person\" id=\""+key+"\">  <div class=\"icon\">"
                          + "<img src=\""+picurl+"\" alt=\"\" />"
                          + "</div><div class=\"nameOfperson\">"+name+"</div></div>");
                          pcounp++;
                    }
                  }
                }
                  });

            });
            /*var repeated = new Array();
                 var limit;
                 if(uniqueArray.length>4) {
                   limit = 4;
                 } else {
                   limit = uniqueArray.length;
                 }
                 for (i = 0; i < limit;i++) {
                     var pos = Math.floor(Math.random() * uniqueArray.length);

                     if(isInArray(uniqueArray[pos].key, repeated)==false) {
                       $('.people').append("<div class=\"person\" id=\""+uniqueArray[pos].key+"\">  <div class=\"icon\">"
                           + "<img src=\""+people[pos].picurl+"\" alt=\"\" />"
                           + "</div><div class=\"nameOfperson\">"+uniqueArray[pos].name+"</div></div>");
                       repeated.push(uniqueArray[pos].key);
                     }
                 }*/
          }
        });
      });
    }
    });
  });

});
