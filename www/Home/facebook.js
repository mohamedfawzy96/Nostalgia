
$("#ConnectWithFacebook").click(function(){
  $(".facebook").css({"transform":"translateX(-1000px)"})

  $(".TheMemory").css({"transform":"translateX(0)"})
  //login();

})
$(".Post1").click(function(){
  $(".TheMemory").css({"transform":"translateY(1000px)"})
  $(".TheMemory").css({"display":"none"})
  $(".filter3").fadeOut();




})

$(".No").click(function(){
logout()


})


var login = function () {
               if (!window.cordova) {
                   var appId = prompt("Enter FB Application ID", "");
                   facebookConnectPlugin.browserInit(appId);
               }
               facebookConnectPlugin.login( ["user_photos"],
                   function (response) { alert(JSON.stringify(response))
                     $(".facebook").css({"transform":"translateX(-1000px)"})

                     $(".TheMemory").css({"transform":"translateX(0)"})
                     apiTest()

                    },
                   function (response) { alert(JSON.stringify(response)) });
           }
 var apiTest = function () {
                           facebookConnectPlugin.api( "me?fields=photos", ["user_photos"],
                               function (response) { alert(JSON.stringify(response))
                                                     var length = response.photos.data.length
                                                     facebookConnectPlugin.api( response.photos.data[length-1].id+"?fields=picture", ["user_photos"],
                                                                               function (response) { alert(JSON.stringify(response))
                                                                               alert(response.picture)
                                                                               $(".PhotoMemory").css({"background-image":"url("+response.picture+")"})




                                                                               },
                                                                               function (response) { alert(JSON.stringify(response)) });


                                                     },
                               function (response) { alert(JSON.stringify(response)) }); }

                               var logout = function () {
                                                facebookConnectPlugin.logout(
                                                                    function (response) { alert(JSON.stringify(response))
                                                                    alert("hi") },
                                                                        function (response) { alert(JSON.stringify(response))
                                                                        alert("bi") });
                                                         }
