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

	var effectattr = "normal";
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
		if($(this).attr("class")=="notonce"){
			$(this).attr("class","once");
			getMembers();
			//alert($(this).attr("class"));
		}
	});
	var membersArray = new Array();

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

					$( ".content li" ).each(function( index ) {
						//console.log( index + ": " + $( this ).text() );
						var chkbx = $(this).find("input:checkbox");
						//alert(chkbx.prop("checked"));
						if(chkbx.prop("checked")){
							//alert($(this).attr('rel'));
							membersArray.push($(this).attr('rel'));
						}
					});
					//alert(membersArray);

					var newmemory = new Memory(file.name, file.size, file.type, 'image',
					uploadTask.snapshot.downloadURL, effectattr, privateattr, captionattr, 0,
					null, null, date, username, (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a'));
					var key = imagesRef.push();
					key.child("comments").child("0").set("hello");
					alert(membersArray.length);

					key.set(newmemory);
					//alert(key);

					for (var i = 0; i < membersArray.length; i++) {
						//alert(membersArray[i]);
						key.child("members").child(i).set(membersArray[i]);
						var index = membersArray[i];
						var ref = database.ref().child("users").child(membersArray[i]).once('value',
					function(memberToSnap){
						var key3 = (key +'').split("/").pop();
						database.ref().child("users").child(index).child("member").once('value',function(snapshot){
							alert(memberToSnap.child("email").val());
							alert(snapshot.numChildren());
							key3 = key +'';
								var num = snapshot.numChildren();
								database.ref().child("users").child(index).child("member").child(num).set(key3);
						});


					}).then(function(){
						alert("success");

					});
					};
					users.child(user.uid).once('value', function(usersnap){
						var num = usersnap.child("memberposted").numChildren();
						users.child(user.uid).child("memberposted").child(num).set(((key +'').split("/").pop()));
					}).then(function(){
						users.child(user.uid).child("posted").once('value',function(snapshot){
							alert(snapshot.numChildren());
							key2 = (key +'').split("/").pop();
								var num = snapshot.numChildren();
								users.child(user.uid).child("posted").child(num).set(key2);

						}).then(function(){
							window.location = "../Home/home.html";
						});
					});


	  });
	};

});
