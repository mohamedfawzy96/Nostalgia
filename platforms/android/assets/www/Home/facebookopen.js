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
            alert(fromwhere)

        }
    }
};
qs()
function hidefacebook(){

  var currentUserId = firebase.auth().currentUser.uid;
  database.ref().child("users").child(currentUserId).once("value",function(user){
    if(user.child("facebook").val()==null){

      $('.facebook').css({"transform":"translateY(0)"});
      $('.filter3').show()




    }




  })


}



function changefacestate(bool){
  var currentUserId = firebase.auth().currentUser.uid;
  database.ref().child("users").child(currentUserId).child("facebook").set(bool)
}
