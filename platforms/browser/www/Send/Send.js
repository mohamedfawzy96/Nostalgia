$(window).load(function(){
		$('#selectphoto').trigger('click');
});
$(function(){
	alert('ready');

	$('#selectphoto').trigger('click');
	$('#selectphoto').click();
	$("#description input").click();
	$('#description input').trigger("click");
	var effectid = $('.effectselected1')
	var effectattr="normal";

	$("#private").click(function(){
		$('#selectphoto').trigger('click');

	});

	effectid.click(function(){
		var id = $(this).attr("id")
		effectattr = id
		$(".effectselected1").removeClass("addedClasToeffect")
		$("."+id).addClass("addedClasToeffect")
	});

	$('#selectphoto').click();

	$('#done').click(finalize);
	$('#back').click(function(){

		alert("d")
	});

	function addmembers(user, id){
	  var html = "<li rel="+id+">"+
	    "<div id=\"user\"  >"+
	      "<p>"+
	        user
	        +
	      "</p>"
	      +
	    "</div>"
	    +
	    "<div class=\"checking\">"
	    +  "<input type=\"checkbox\" name=\"name\" id=\"added\" >"
	    +
	    "</div>"
	    +

	  "</li>"

	  $(".content").append(html);
	};

	$("#addMember").click(function(){
		getMembers();
	  $(".members").fadeIn();
	  $(".filter").fadeIn();
	});
	$("#doneMembers").click(function(){
	  $(".members").fadeOut();
	  $(".filter").fadeOut();
		$( ".content li" ).each(function( index ) {
		  console.log( index + ": " + $( this ).text() );
			var chkbx = $(this).find("input");
			alert(chkbx.val());
		});
		$('li:checked').each(function(li){
		});
	});


	function getMembers(){
		var users = database.ref().child("users");
		users.once('value', function(usersSnap){
			usersSnap.forEach(function(user){
				//alert(user.child("email").val());
				addmembers(user.child("username").val(), user.child("uid").val());
			});
		});
	};

	function finalize(){
	    var user = firebase.auth().currentUser;
			var username;
			var users = database.ref().child("users");
			var userInDatabase = users.child(user.uid).child("username");
      userInDatabase.once('value',function(snapshot){
				username = snapshot.val();
			});
			var file = document.getElementById('selectphoto').files[0];
	    var imageRef = storageRef.child('memories/'+file.name);
	    var uploadTask = imageRef.put(file);
	    uploadTask.on('state_changed', function(snapshot){
	        switch (snapshot.state) {
	          case firebase.storage.TaskState.PAUSED: // or 'paused'
	            console.log('Upload is paused');
	            break;
	          case firebase.storage.TaskState.RUNNING: // or 'running'
	            console.log('Upload is running');
	            break;
	          case firebase.storage.TaskState.PROGRESS: // or 'progress'
	            {
	              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	              console.log('Upload is ' + progress + '% done');
	            }
	            break;
	        }
	  }, function(error) {
	      alert(error);
	  }, function() {
	  		var privateattr = document.getElementById('private').checked;
	  		var captionattr = $('#caption').val();
	  		var dateattr = null;
	        var imagesRef = database.ref().child('memories');
	        var userImagesRef = imagesRef.child(user.uid);
					var date   = $("#drop").html();
					var newmemory = new Memory(file.name, file.size, file.type, 'image',
					uploadTask.snapshot.downloadURL, effectattr, privateattr, captionattr, 0,
					null, null, date, username, (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a'));
					var key = imagesRef.push();
					key.set(newmemory);
					alert(key);

					users.child(user.uid).child("posted").once('value',function(snapshot){

						alert(snapshot.numChildren());
						key2 = key +'';
							var num = snapshot.numChildren();
							if(snapshot.child("0").val()=="hello"){
								users.child(user.uid).child("posted").child(0).set(key2);
							}
							else{
								users.child(user.uid).child("posted").child(num).set(key2);
							}
					}).then(function(){
						window.location = "../Home/home.html";
					});
	  });
	};


});
