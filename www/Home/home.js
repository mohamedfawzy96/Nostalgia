$(function(){
  $('body, html, #body1').scrollTop(0);
  $(".filterspin").css({"display":"flex"})
  var imguid;
  var selectedimg;
  var startindex;
  var endindex;
  $("#connect").click(function() {
    window.location = '../connecting/connecting.html'
  });

  $( window ).load(function() {
    // Handler for .load() called.

  });
  var oneTime = true

  $(document).on('tap', '.box', function() {
    selectedimg = $(this).attr('rel');
     imguid = $(this).attr('rel');
     $(".photo").css({"height":"36vh"})
     $(".memorychat").css({"top":"75vh"})
     $(".expand img").css({"transform":"rotate(0)"})
     $(".memchat").height(height2+"px")
     $(".input22").css({"transform":"translateX(1000px)"})
     // UpdateImageView is in the memory.js it is instead of $(function(){})---> UpdateImageView(imageuid1)

    UpdateImageView(imguid,oneTime);
    $(".mphoto").fadeIn()
    $(".mphoto").addClass("maddedClass")
    $(".mfilter").fadeIn();
    $(".mfullScreen").css({"transform":"translateX(0)"})
    oneTime = false;

  });

  $(document).on('tap', '.clickableimg', function(event) {
    event.stopPropagation();
    //alert('here');
    //alert($(this));
    imguid  = $(this).attr('id');

    //alert(imguid)
    // UpdateImageView is in the memory.js it is instead of $(function(){})---> UpdateImageView(imageuid1)

    UpdateImageView(imguid)
    $(".mphoto").fadeIn()
    $(".mphoto").addClass("maddedClass")
    $(".mfilter").fadeIn();
    $(".mfullScreen").css({"transform":"translateX(0)"});

  });
  <!--NOTE nw code-->
  var oncemembers = "false";
  $('#membersicon').click(function() {
    if(oncemembers !="true") {
      database.ref().child('memories').child(imguid).child('members').on('child_added', function(useruid) {
        database.ref().child('users').child(useruid.val()+'').once('value', function(userSnap) {
            $('#memberscontent').append("<li rel=\""+useruid.val()+''+"\">"
            + "<div id=\"user\"><div class=\"profilephoto\" style=\"background-image:url("+userSnap.child('profilephoto').val()+")\">"
            + "</div><div class=\"name\">"+userSnap.child('username').val()+"</div></div></li>");
        });
      });
      oncemembers = "true";
    }
  });

  // moved the send to the home.js
  $(".msend12").click(function(){
    var user = firebase.auth().currentUser;
    var users = database.ref().child("users");
    var username;
    var userInDatabase = users.child(user.uid).child("username");
    userInDatabase.once('value',function(snapshot){
      username = snapshot.val();
    var cmntdata = $('#message').val();
    var newcomment = new Comment((users.child(user.uid)+"").split("/").pop(), cmntdata,username);
    var key = database.ref().child("comments").push();
    key.set(newcomment);
    database.ref().child("memories").child(imguid).once('value', function(usersnap){
      var num = usersnap.child("comments").numChildren();
      var keytoadd = (key+'').split("/").pop();
      database.ref().child("memories").child(imguid).child("comments").child(num).set(keytoadd);

      var owneruid = "";
      database.ref().child("memories").child(imguid).once('value', function(memorysnap){
        owneruid += memorysnap.child('owneruid').val();
      }).then(function() {
        var notificationkey = database.ref().child('notifications').push();
        notificationkey.set({
          subject: user.uid,
          notified: owneruid,
          subjectname: username,
          memoryid: imguid,
          type: "commented",
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

    }).then(function(){
      //$('#chattingbody').append("<li id=\"new\"> <div class=\"2\" ID=\"userInChat\">"+username+" </div>  <div ID=\"userMessage\">"+cmntdata+" </div> </li>");

      var target = $('#new');
      $('#message').val('');
      /*if( target.length ) {
          $('html, body').animate({
              scrollTop: target.offset().top
          }, 1000);
      };*/
    });
  });
  //////////new request




  //////


  memoriesArray = new Array();
  urlArray = new Array();
  var funfil = function (x, length1, listOfImages) {
    if(x==length1) {
      return;
    } else {
      listOfImages[x].once('value', function(data) {
        console.log(data.key);
        var uid = data.key;
        //alert(uid);
        var url1 = data.child("url").val()
        var date1= data.child("date").val()
        var owner1= data.child("owner").val()
        add1Memories(owner1,date1,"closed",url1,uid);
      }).then(function() {
        funfil(++x, length1, listOfImages);
      });
    }
  }
  function fillMemoriesPanel(listOfImages) {
    var length1 = listOfImages.length;
    funfil(0, length1, listOfImages);

    $(".filterspin").fadeOut();
  };


  jQuery(function($) {
      $('#body1').on('scroll', function() {
          if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
              //alert('end reached');
              if(startindex>=0) {
                getImages();

              }

          }
      })
  });

    firebase.auth().onAuthStateChanged(function(user) {
      hidefacebook()
      function request(){
        var user55 = firebase.auth().currentUser;


        database.ref().child("users").child(user55.uid).on("value",function(user){
          var reqnum = user.child("ReceivedRequests").val();
          if(reqnum != null){
          if(reqnum.length>0){
            $(".notif").css({"opacity":"1"});

            if(reqnum.length>9){
              $(".notif").html("9+")


            }else{
              $(".notif").html(reqnum.length)

            }


          }
        }

        })
      }
      request();

      var user = firebase.auth().currentUser;
      var username;
      var userInDatabase = database.ref().child('users').child(user.uid).child("username");

      userInDatabase.once('value',function(snapshot){
        $('#title p').html(snapshot.val());
        $('#title2 p').html(snapshot.val());
      });
      getFeelIt();
      if (user) {
        database.ref().child('users').child(user.uid).child('memberposted').once('value', function(memoriesSnap) {
          //alert(memoriesSnap.numChildren());
          var num = memoriesSnap.numChildren();
          if(num>0) {
            endindex = num-1;
          }
          if(num>=6) {
            startindex = num-6;
          } else {
            startindex = 0;
          }
        }).then(function() {
          getImages();
        });
        //alert(user)
      } else {
        // No user is signed in.
      }
    });

    $(".tab1").click(function(){
      $("#body2").css({"display":"none"});

    $("#body1").css({"display":"block"});
    $(this).css({"border-bottom":"7px solid white"});
    $(".tab2").css({"border":"0"});
    $(".tab3").css({"border":"0"});
  });

  $(".tab2").click(function(){
    $("#body1").css({"display":"none"});

    $("#body2").css({"display":"block"});
    $("tab").css({"border":"0"});
    $(this).css({"border-bottom":"7px solid white"});
    $(".tab1").css({"border":"0"});
    $(".tab3").css({"border":"0"});

    if($('#body2').attr('class')=="notevenonce"){
      $('#body2').attr('class','once');
    }
  });

  $(".tab3").click(function(){
    $("#body2").css({"display":"block"});
    $("#body1").css({"display":"none"});
    $("tab").css({"border":"0"});
    $(this).css({"border-bottom":"7px solid white"});
    $(".tab1").css({"border":"0"});
    $(".tab2").css({"border":"0"});
  });
  function getFeelIt() {
    var currentUserId = firebase.auth().currentUser.uid;
    database.ref().child('users').child(currentUserId).child('feelit').on('child_added', function(memoryKeySnap) {
      var memoryID = (memoryKeySnap.val()+'').split("/").pop();
      //should change this after cleaning the databse
      //alert(memoryID);
      database.ref().child("memories").child(memoryID).once('value',function(memorySnap){
        //alert(memorySnap.child("url").val());
        var url = memorySnap.child("url").val();
        var owner = memorySnap.child("owner").val();
        var date = memorySnap.child("date").val();
        var caption = memorySnap.child("caption").val();
        if(caption==""){
          caption = "no caption";
        }

        var str = "<li class=\"clickableimg\" id=\""+memoryID+"\"><div class=\"card\"><div class=\"imgMemory \" style='background-image:url("+url+")'></div><div class=\"info\"><div class=\"action sector\"><div class=\"icon2\"></div><div class=\"text\"><p id=\"owner\">"+owner+" just shared a memory</p></div></div><div class=\"date1 sector\"><div class=\"icon\"><img src=\"../Memory/img/dateIcon.svg\" alt=\"\" /></div><div class=\"text\"><p id=\"date\">"+date+"</p></div></div><div class=\"caption1 sector\"><div class=\"icon\"><img src=\"../Memory/img/captionIcon.svg\" alt=\"\" /></div><div class=\"text\"><p id=\"caption\">"+caption+"</p></div></div></div></li>";
        $('#body2').prepend(str);
      });
    });

  }
  function getFeelIt2(){
    var currentUserId = firebase.auth().currentUser.uid;
    var memoriesIDs = new Array();
    database.ref().child('users').child(currentUserId).child('friends').on('child_added', function(userKeySnap) {
      database.ref().child('users').child(userKeySnap.val()+'').once('value', function(userSnap){
        //alert(userSnap.key);
        database.ref().child("users").child(userSnap.key).child("feelit").on('child_added', function(memoryKeySnap){
          var memoryID = (memoryKeySnap.val()+'').split("/").pop();
          //should change this after cleaning the databse
          //alert(memoryID);
          database.ref().child("memories").child(memoryID).on('value',function(memorySnap){
            //alert(memorySnap.child("url").val());
            var url = memorySnap.child("url").val();
            var owner = memorySnap.child("owner").val();
            var date = memorySnap.child("date").val();
            var caption = memorySnap.child("caption").val();
            if(caption==""){
              caption = "no caption";
            }
            var str = "<li><div class=\"card\"><div class=\"imgMemory \" style='background-image:url("+url+")'></div><div class=\"info\"><div class=\"action sector\"><div class=\"icon2\"></div><div class=\"text\"><p id=\"owner\">"+owner+" just shared a memory</p></div></div><div class=\"date1 sector\"><div class=\"icon\"><img src=\"../Memory/img/dateIcon.svg\" alt=\"\" /></div><div class=\"text\"><p id=\"date\">"+date+"</p></div></div><div class=\"caption1 sector\"><div class=\"icon\"><img src=\"../Memory/img/captionIcon.svg\" alt=\"\" /></div><div class=\"text\"><p id=\"caption\">"+caption+"</p></div></div></div></li>";
            $('#body2').prepend(str);
          });
        });
      })
    });
  };

  function handleFileSelect(evt) {
    window.location = "../Send/Send.html";
  };
  var memoriesArray = new Array();
  var urlArray = new Array();
  function getImages(){
    memoriesArray = new Array();
      var user = firebase.auth().currentUser;
      var users = database.ref().child("users");
      var userInDatabase = users.child(user.uid);
      var imagesRef = userInDatabase.child("memberposted");
      //alert(startindex+'/'+endindex);
      imagesRef.orderByKey().startAt(startindex+'').endAt(endindex+'').once('value',function(snapshot){
        memorySnap = snapshot.val();
        console.log(memorySnap);
        console.log(memorySnap[9])
        if(memorySnap != null){
        //memorySnap.forEach(function(memorySnapshot)
        for(var i=startindex; i<=endindex; i++){
          var memorySnapshot = memorySnap[i];
          <!-- NOTE -->
          //you should delete the split and pop because I already fixed it in Send
          //but it doesn't make a difference if you son't because the key
          //doesn't have "/" in it, so no biggie
          var res = memorySnapshot.split("/");
          var memory = res.pop();
              var url ="";
              var imagesRef = database.ref().child('memories');
              var imageRef = imagesRef.child(memory);
            /*  imageRef.once('value', function(data){
                url = data.child("url").val()
                memoriesArray.push(data);
                urlArray.push(url);

              });
                  */
                  if(imageRef != null){
                  memoriesArray.push(imageRef);
                }
        };
      }
        //console.log(memoriesArray)
        memoriesArray.reverse();
        //setTimeout(fillMemoriesPanel(memoriesArray), 5000);
        fillMemoriesPanel(memoriesArray);


      });

      if(startindex>=6) {
        endindex = startindex-1;
        startindex -= 6;

      } else {
        if(startindex==0) {
          startindex = -1;
        } else {
          endindex = startindex-1;
          startindex = 0;
        }
      }
  };

  $("#sendimg").click(handleFileSelect);
  $('#menu').click(function(){
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      //alert(firebase.auth().currentUser);
      window.location = "../index.html";
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  });

  //$(".notif").position(positionconnec);
  $('.facebook').hide();
  $('.filter3').hide();
});
