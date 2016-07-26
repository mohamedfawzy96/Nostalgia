var qsParm = new Array();
var fromwhere;
function qs() {
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    for (var i=0; i < parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0) {
            var key = parms[i].substring(0, pos);
            var val = parms[i].substring(pos + 1);
            qsParm[key] = val;
            fromwhere = qsParm[key];
            //alert(fromwhere)

        }
    }
};


$(document).on('tap', '.Connect', function(){
               alert("hi")
               login2()

               });


function changefacestate(bool){
    var currentUserId = firebase.auth().currentUser.uid;
    database.ref().child("users").child(currentUserId).child("facebook").set(bool)
}

var login2 = function () {

    if (!window.cordova) {
        var appId = prompt("Enter FB Application ID", "");
        facebookConnectPlugin.browserInit(appId);
    }
    facebookConnectPlugin.login( ["user_photos"],
                                function (response) { alert(JSON.stringify("response"));
                                //$(".facebook").css({"transform":"translateX(-1000px)"});
                                //$(".TheMemory").css({"transform":"translateX(0)"});
                                //apiTest();
                                changefacestate(true)

                                $(".connect").hide()
                                getfb(1)
                                },
                                function (response) { alert(JSON.stringify(response)) });
}

function firstFb(){
    var currentUserId = firebase.auth().currentUser.uid;
    database.ref().child("users").child(currentUserId).once("value",function(user){
                                                            if(user.child("facebook").val()==true){
                                                            qs();

                                                            if(fromwhere == "true"){
                                                            //alert("hi")
                                                            login()


                                                            }
                                                            getfb(1)

                                                            }else{
                                                            $(".spinner2").hide()
                                                            $(".connect").css({"display":"flex"})


                                                            }




                                                            })

}
function addreco(url,url){
    var html =   "<div rel="+url+" class='imgreco' style='background-image: url("+url+");'>     </div>"
    $(".imgrecodiv").append(html)



}
var login = function () {

    if (!window.cordova) {
        var appId = prompt("Enter FB Application ID", "");
        facebookConnectPlugin.browserInit(appId);
    }
    facebookConnectPlugin.login( ["user_photos"],
                                function (response) { alert(JSON.stringify("Connected"));
                                $(".spinner2").hide()


                                },
                                function (response) { alert(JSON.stringify(response))
                                //changefacestate(false)
                                $(".spinner2").hide()

                                });
}




var getfb = function (i) {

    facebookConnectPlugin.api( "me?fields=photos", ["user_photos"],
                              function (response) { //alert(JSON.stringify(response))
                              var length = response.photos.data.length
                              if(i > length-1){
                              return
                              }
                              facebookConnectPlugin.api( response.photos.data[length-i].id+"?fields=images", ["user_photos"],
                                                        function (response) { //alert(JSON.stringify(response))
                                                        //alert(response.images[0].source)
                                                        if(i == 1){
                                                        $(".photo img").attr("src",response.images[0].source)
                                                        }
                                                        addreco(response.images[0].source,response.images[0].source)
                                                        i++;
                                                        getfb(i)




                                                        },
                                                        function (response) { alert(JSON.stringify(response)) });


                              },
                              function (response) { alert(JSON.stringify(response)) }); }
