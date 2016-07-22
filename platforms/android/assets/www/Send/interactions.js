var privateattr = true
var captionattr = $(".rest input").text()
var date = "Can't remember"
var effectattr= "normal"
var membersArray = new Array();
var img = new Image;
//document.addEventListener("deviceready", function(){

$(document).on('tap', '.imgreco', function(){
facebook = true;
$(".photo img").attr("src",$(this).attr("rel"))
});



$("#private").click(function(){
  $("#private .rest").css({"transform":"translateY(50px)"})
  $("#private .rest").css({"opacity":"0"})
  setTimeout(function(){
    if(privateattr){
      $("#private .rest").html("Public")
      privateattr  = false;
    }else{
      $("#private .rest").html("Private")
      privateattr = true;
    }
    $("#private .rest").css({"transform":"translateY(0)"})
    $("#private .rest").css({"opacity":"1"})

  },100)


})



setTimeout(function(){
getfb(1)
},100)


$(".text").click(function(){
        if($(this).html()=="Next"){

 $(".choosePhoto").css({"transform":"translateX(-1000px)"})
 $(".last").css({"transform":"translateX(0)"})
 $(this).html("Post")

            } else if ($(".text").html()=="Done") {
              $(".members").css({"transform":"translateY(10000px)"})
               $(".back").css({"opacity":"1"})
           $(this).html("Post");

           } else if ($(".text").html()=="Post") {
                
               finalize();
               }
     });

    function getMembers(){
        var curruser = firebase.auth().currentUser;
        var users = database.ref().child("users").child(curruser.uid).child('friends');
        users.on('child_added', function(friendidSnap){
        var friendid = friendidSnap.val();
            database.ref().child('users').child(friendid).once('value', function(friend) {
              addmembers(friend.child("username").val(), friend.child("uid").val());
            });
    });
    };

                          function addmembers(user, id){
                          var html = "<li rel=\""+id+"\">"
                          +  "<div id=\"user\">"
                          +    "<div class=\"profilephoto\" style=\"background-image:url(\'img/test.jpg\')\">"
                          +    "</div>"
                          +    "<div class=\"name\"> "
                          +    user
                          +    "</div>"
                          +  "</div>"
                          +  "<div class=\"checking\">"
                          +  "<input type=\"checkbox\" name=\""+user+"\" id=\"added\">"
                          +  "</div>"
                          +  "</li>";
                          $(".content").append(html);
                          }

                          $("#addMembers").click(function(){
                                                 $(".members").css({"transform":"translateY(0)"});
                                                 setTimeout(function(){
                                                            $(".text").html("Done")
                                                            $(".back").css({"opacity":"0"});
                                                            }, 700);
                                                 $(".content").html("");
                                                 getMembers();
                                                 });

                          $(document).on('click ', 'input[type="checkbox"]', function(event) {
                                         if($(this).parent().parent().attr('class')=="checked") {
                                         $(this).parent().parent().attr('class','unchecked');
                                         } else {
                                         $(this).parent().parent().attr('class','checked');
                                         }
                                         });


                          $("#addDate").click(function(){


                                              $(".date").css({"transform":"translateX(0)"})
                                              $(".filterB").fadeIn()
                                              });
                          function myReplaceMethod(str,find,replace_with){
                          while (str.indexOf(find) !== -1 ){
                          from = str.indexOf(find);
                          to = from + find.length;
                          str = str.substr(0,from)+replace_with+str.substr(to, str.length-to);
                          }
                          return str;
                          }
                          $(".Dateoptions").click(function(){
                                                  $(".date").css({"transform":"translateX(1000px)"})
                                                  $(".filterB").fadeOut()
                                                  date = $(this).html()+""
                                                  var date1 = myReplaceMethod(date,"<br>","")
                                                  date = date1






                                                  })
                          $(".filterB").click(function(){
                                              $(".date").css({"transform":"translateX(1000px)"})
                                              $(".filterB").fadeOut()






                                              })


                          $(".back").click(function(){
                                           if($(".text").html()=="Post"){


                                           $(".choosePhoto").css({"transform":"translateX(0px)"})
                                           $(".last").css({"transform":"translateX(1000px)"})
                                           $(".text").html("Next")

                                           }else {
                                             window.location = "../Home/Home.html"

                                           }


                                           })
                          $(".eff").click(function(){
                                          $(".eff").css({  "border":"0"})
                                          effectattr = $(this).children(".time").html()


                                          $(this).css({  "border":"3px solid grey"})
                                          if($(this).children(".time").html()=="1970"){
                                          $(".photo1").css({"filter":"grayscale(100%)"})
                                          $(".photo1").css({"-webkit-filter":"grayscale(100%)"})


                                          }

                                          else{
                                          $(".photo1").css({"filter":"grayscale(0)"})
                                          $(".photo1").css({"-webkit-filter":"grayscale(0)"})
                                          var filter = $(this).children(".filterEff").css("background-color")
                                          $(".filterEffpho").css({"background-color":filter})

                                          }



                                          })



                          //});
