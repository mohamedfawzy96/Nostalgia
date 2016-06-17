$(function(){

  var users = database.ref().child('users');
  var array = new Array();
  users.on("child_added",function(user){
    addToSearchContent(user.child("username").val(),"../home/img/test.jpg",user.child("uid").val())

  })
var uid1 = 0;








  $(document).on('click tap', '.AddFriend', function() {
    var requestID = database.ref().child('request').push();
    var From = firebase.auth().currentUser.uid
    var to = $(this).attr("uid")


    var request = new Request(From,to,false)
    users.child(to).once("value",function(snapshot){
      var num = snapshot.child("RecivedRequests").numChildren()
      var ID = (requestID+"").split("/").pop()
      users.child(to).child("RecivedRequests").child(num).set(ID+" ");


    })
    users.child(From).once("value",function(snapshot){
      var num = snapshot.child("SentRequests").numChildren()
      var ID = (requestID+"").split("/").pop()
      users.child(From).child("SentRequests").child(num).set(ID+" ");



    })

    requestID.set(request)


  })







  function addToSearchContent(username,url,uid){



    var  FindHtml = "<li>"+
      "<div class=\"theUser\">"
      +
        "<div class=\"userImage\">"
        +
          "<img src="+url+" />"
          +

        "</div>"

        +
        "<div class=\"usernameOfuser\">"
        +
          username
          +
          "</div>"
        +

      "</div>"
      +
      "<div class=\"AddFriend k\" uid = '"+uid+"'>"
      +
        "Add"
        +

      "</div>"


  +
    "</li>"

    $(".searchView .content").append(FindHtml);
    requested();


  }






});



function requested(){
  //$(".AddFriend").each(function(i){

    //var uid1 = $(this).attr("uid")

  var ID = firebase.auth().currentUser.uid
  var users = database.ref().child('users');
  var bool = false;
  users.child(ID).once("value",function(user){
    var RequestID = user.child("SentRequests").val()
    if(RequestID !=null){
      RequestID.forEach(function(snap){
        var Req2 = (snap+"").split(" ")[0]

        database.ref().child('request').child(Req2).once("value",function(snapshot3){
          var uid2 = snapshot3.child("to").val()
            $(".k[uid*="+uid2+"]").removeClass("AddFriend")
            $(".k[uid*="+uid2+"]").html("Requested")

            $(".k[uid*="+uid2+"]").addClass("requested")











        });

      })

    }





  })
//})



}
