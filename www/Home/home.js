$(function(){

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        getImages();
      } else {
        // No user is signed in.
      }
    });
    //var user = firebase.auth().currentUser;
    //getImages();
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
    file = evt.target.files[0]; // FileList object
    window.location = "../Send/send.html";
  };

  function getImages(){
      var div = $('#body1');
      newhtml = "";
      var user = firebase.auth().currentUser;
      var imagesRef = database.ref().child('memoriespic/'+user.uid);
      imagesRef.once('value',function(snapshot){
      snapshot.forEach(function (imageObj){
        var st = imageObj.child("name").val();
        var string = 'memories/'+user.uid + st;
        var image = storageRef.child(string);
        //imageObj.forEach(function (child){
          //alert(child.val);
        //});
        //alert(imageObj.child("url").val());
        var url = imageObj.child("url").val();
        newhtml += "<img src="+url+" class=\"memoriespic\">";

      });
      div.html(newhtml);
      //alert('done');
    });
  };

  $("#files").click(handleFileSelect);
  $('#files').hide();
  //alert('loading images now!');
  //$('#body1').remove();
});
