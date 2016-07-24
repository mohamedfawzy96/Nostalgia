$(function() {

  /*FB.init({
  appId : '1594582047520422',
  cookie : true,  // enable cookies to allow the server to access
                  // the session
  xfbml : true,  // parse social plugins on this page
  version : 'v2.6' // use graph api version 2.5
  });
  (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));*/




  var login = function () {

                 if (!window.cordova) {
                     var appId = prompt("Enter FB Application ID", "");
                     facebookConnectPlugin.browserInit(appId);
                 }
                 facebookConnectPlugin.login( ["user_photos"],
                     function (response) { alert(JSON.stringify("response"));
                       $(".facebook").css({"transform":"translateX(-1000px)"});
                       $(".TheMemory").css({"transform":"translateX(0)"});
                       apiTest();
                      },
                     function (response) { alert(JSON.stringify(response)) });
             }

             var apiTest = function () {
                                       facebookConnectPlugin.api( "me?fields=photos", ["user_photos"],
                                           function (response) {
                                                                 var length = response.photos.data.length
                                                                 facebookConnectPlugin.api( response.photos.data[length-2].id+"?fields=images", ["user_photos"],
                                                                                           function (response) {
                                                                                           $(".PhotoMemory").css({"background-image":"url("+response.images[0].source+")"})



                                                                                           },
                                                                                           function (response) { alert(JSON.stringify(response)) });


                                                                 },
                                           function (response) { alert(JSON.stringify(response)) }); }

  var logout = function () {
                  facebookConnectPlugin.logout(function (response) {
                    alert(JSON.stringify(response));
                    alert("hi");
                  },
                  function (response) {
                    alert(JSON.stringify(response));
                    alert("bi")
                  });
                }

                $("#ConnectWithFacebook").click(function(){
                  $(".facebook").css({"transform":"translateX(-1000px)"})
                  $(".TheMemory").css({"transform":"translateX(0)"})
                  login();

                });
                $(".Post1").click(function(){
                  $(".TheMemory").css({"transform":"translateY(1000px)"});
                  $(".TheMemory").css({"display":"none"})
                  $(".filter3").fadeOut();
                });

                $(".No1").click(function(){
                logout();
                });

});
