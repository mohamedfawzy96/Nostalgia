

$(function(){
  var selectedimg;
  $("#connect").click(function(){
    window.location = '../connecting/connecting.html'


  })


  $(document).on('click tap', '.box', function() {
    selectedimg = $(this).attr('rel');
    window.location = '../Memory/memory.html?somval=' + $(this).attr('rel');
  });

  $(document).on('click tap', '.clickableimg', function() {
    alert($(this));
    window.location = '../Memory/memory.html?somval=' + $(this).attr('id');
  });


  memoriesArray = new Array();
  urlArray = new Array();

  function fillMemoriesPanel(listOfImages){
    var length1 = listOfImages.length;

    var counter = 0;
        while(counter<length1){
      listOfImages[counter].once('value', function(data){
        console.log(data.key);
        var uid = data.key;
        //alert(uid);
        var url1 = data.child("url").val()
        var date1= data.child("date").val()
        var owner1= data.child("owner").val()
        /*if((counter+1)<length1){
          alert("hi bye ")

          listOfImages[counter+1].once('value', function(data){
            var url2 = data.child("url").val()
            var date2= data.child("date").val()
            var owner2= data.child("owner").val()
            add2Memories(owner1,date1,"closed",url1,owner2,date2,"closed",url2)


            })


        }
        else{
          add1Memories(owner1,date1,"closed",url1);
        }*/
        add1Memories(owner1,date1,"closed",url1,uid);
      });
        counter++;
    }
  };


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        getImages();
        aler(user)
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
      getFeelIt();
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

  function getFeelIt(){
    var currentUserId = firebase.auth().currentUser.uid;
    var memoriesIDs = new Array();
    database.ref().child('users').child(currentUserId).child('friends').on('child_added', function(userKeySnap){
      database.ref().child('users').child(userKeySnap.val()+'').once('value', function(userSnap){
        alert(userSnap.key);
        database.ref().child("users").child(userSnap.key).child("memberposted").on('child_added', function(memoryKeySnap){
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
            var str = "<li><div class=\"card\"><div class=\"imgMemory \"><img class=\"clickableimg\" src=\""+url+"\" alt=\"\" id=\""+memoryID+"\"/></div><div class=\"info\"><div class=\"action sector\"><div class=\"icon2\"></div><div class=\"text\"><p id=\"owner\">"+owner+" just shared a memory</p></div></div><div class=\"date1 sector\"><div class=\"icon\"><img src=\"../Memory/img/dateIcon.svg\" alt=\"\" /></div><div class=\"text\"><p id=\"date\">"+date+"</p></div></div><div class=\"caption1 sector\"><div class=\"icon\"><img src=\"../Memory/img/captionIcon.svg\" alt=\"\" /></div><div class=\"text\"><p id=\"caption\">"+caption+"</p></div></div></div></li>";
            $('#body2').append(str);
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
      var user = firebase.auth().currentUser;
      var users = database.ref().child("users");
      var userInDatabase = users.child(user.uid);
      var imagesRef = userInDatabase.child("posted");
      imagesRef.once('value',function(snapshot){

        memorySnap = snapshot.val();
        console.log(memorySnap);
        if(memorySnap != null){
        memorySnap.forEach(function(memorySnapshot){
          <!-- NOTE -->
          //you should delet the split and pop because I already fixed it in Send
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
        });
      }
        fillMemoriesPanel(memoriesArray);

      });
  };

  $("#sendimg").click(handleFileSelect);
  $('#menu').click(function(){
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      alert(firebase.auth().currentUser);
      window.location = "../index.html";
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  });
});
