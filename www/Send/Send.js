$(function(){
	var effectid = $('.effectselected1')
	var effectattr;

	$("#private").click(function(){
		$("#description input").click();


	})

	effectid.click(function(){
		var id = $(this).attr("id")
		effectattr = id
		$(".effectselected1").removeClass("addedClasToeffect")
		$("."+id).addClass("addedClasToeffect")




	})

	$('#selectphoto').click();

	$('#done').click(finalize);
	$('#back').click(function(){

		alert("d")
	});

  //$('#files').hide();
	function finalize(){
		alert("why");
	    var user = firebase.auth().currentUser;
			var username ;

	    alert(user.uid);
			var users = database.ref().child("users");
			var userInDatabase = users.child(user.uid).child("username")
      userInDatabase.once('value',function(snapshot){
				username = snapshot.val()
			})
			var file = document.getElementById('selectphoto').files[0];
	    var imageRef = storageRef.child('memories/'+user.uid+'/'+file.name);
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
					var date   = $("#drop").html()

	        userImagesRef.push().set({
	          name: file.name,
	          size: file.size,
	          type: file.type || 'n/a',
	          filetype: 'image',
	          url: uploadTask.snapshot.downloadURL,
	          effect : effectattr,
	          private : privateattr,
	          caption : captionattr,
						reposts: 0,
						comments: null,
						members: null,
	          date : date,
						owner : username,
						//owner : database.ref().child('users').child(user.uid).username,
	          lastModifiedDate : file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a'
	        });
	        alert('uploaded image!');
					window.location = "../Home/home.html";

	  });
	};
});
