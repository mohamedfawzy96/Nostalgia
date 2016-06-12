$(function(){

  function fillMemoriesPanel(listOfImages,listOfimagesAttr){
    var length1 = listOfImages.length;
    var counter = 0;
    while(counter<length1){
      var url1 = listOfImages[counter]
      var date1= listOfimagesAttr[counter].child("date").val()
      var owner1= listOfimagesAttr[counter].child("owner").val()
      if((counter+1)<length1){
        var url2 = listOfImages[counter+1]
        var date2= listOfimagesAttr[counter+1].child("date").val()
        var owner2= listOfimagesAttr[counter+1].child("owner").val()

        add2Memories(owner1,date1,"closed",url1,owner2,date2,"closed",url2)
        counter++;

      }
      else{
        add1Memories(owner1,date1,"closed",url1);
      }
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
    $("#body1").css({"display":"block"});
    $("#body2").css({"display":"none"});
    $(this).css({"border-bottom":"7px solid white"});
    $(".tab2").css({"border":"0"});
    $(".tab3").css({"border":"0"});
  });

  $(".tab2").click(function(){
    $("#body2").css({"display":"block"});
    $("#body1").css({"display":"none"});
    $("tab").css({"border":"0"});
    $(this).css({"border-bottom":"7px solid white"});
    $(".tab1").css({"border":"0"});
    $(".tab3").css({"border":"0"});
  });

  $(".tab3").click(function(){
    $("#body2").css({"display":"block"});
    $("#body1").css({"display":"none"});
    $("tab").css({"border":"0"});
    $(this).css({"border-bottom":"7px solid white"});
    $(".tab1").css({"border":"0"});
    $(".tab2").css({"border":"0"});
  });

  function handleFileSelect(evt) {
    window.location = "../Send/Send.html";
  };
  var memoriesArray = new Array();
  var urlArray = new Array();
  function getImages(){
      alert("get");
      var user = firebase.auth().currentUser;
      var users = database.ref().child("users");
      var userInDatabase = users.child(user.uid);
      var imagesRef = userInDatabase.child("posted");
      imagesRef.once('value',function(snapshot){
        memoriesArray = new Array();
        urlArray = new Array();
        memorySnap = snapshot.val();
        //alert(snapshot);
        //console.log(memorySnap);
        alert(memorySnap);
        memorySnap.forEach(function(memorySnapshot){
          alert(memorySnapshot);
          var res = memorySnapshot.split("/");
          var memory = res.pop();
          //alert(memory);
              var url ="";
              var imagesRef = database.ref().child('memories');
              var imageRef = imagesRef.child(memory);
              imageRef.child("url").once('value', function(data){
                url = data.val();
                //alert(url);
                while (!url) {
                  console.log('wait');
                }
                urlArray.push(url);
                memoriesArray.push(snapshot);
              });
        });
        alert(urlArray.length);
        alert(memoriesArray.length);
        fillMemoriesPanel(urlArray, memoriesArray);
      });
  };

  $("#sendimg").click(handleFileSelect);

});
