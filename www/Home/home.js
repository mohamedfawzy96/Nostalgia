

$(function(){
  var selectedimg;
  

  $(document).on('click tap', '.box', function() {
    selectedimg = $(this).attr('rel');
    window.location = '../Memory/memory.html?somval=' + $(this).attr('rel');
  });



  memoriesArray = new Array();
  urlArray = new Array();

  function fillMemoriesPanel(listOfImages){
    var length1 = listOfImages.length;

    var counter = 0;
        while(counter<length1){
      listOfImages[counter].once('value', function(data){
        console.log(data.key);
        var uid = data.key
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



        })

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
      var user = firebase.auth().currentUser;
      var users = database.ref().child("users");
      var userInDatabase = users.child(user.uid);
      var imagesRef = userInDatabase.child("posted");
      imagesRef.once('value',function(snapshot){

        memorySnap = snapshot.val();
        console.log(memorySnap);
        if(memorySnap != "hello"){
        memorySnap.forEach(function(memorySnapshot){
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
        fillMemoriesPanel(memoriesArray)



      });
  };

  $("#sendimg").click(handleFileSelect);

});
