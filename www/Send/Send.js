$(function(){
	$('#done').click(finalize);
  //$('#files').hide();
	function finalize(){
	    var user = firebase.auth().currentUser;
	    alert('here');
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
	  		var effectid = $('.effectselected').attr('id');
	  		var effectattr;
	  		switch(effectid){
	  			case 'normaleffect' : effectattr = 'normal';
	  			break;
	  			case '1970effect' : effectattr = '1970';
	  			break;
	  			case '1980effect' : effectattr = '1980';
	  			break;
	  			case '1990effect' : effectattr = '1990';
	  			break;
	  			case '2000effect' : effectattr = '2000';
	  			break;
	  		};
	  		var captionattr = $('#caption').val();
	  		var dateattr = null;
	        var imagesRef = database.ref().child('memories');
	        var userImagesRef = imagesRef.child(user.uid);
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
	          date : dateattr,
	          lastModifiedDate : file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a'
	        });
	        alert('uploaded image!');
					window.location = "../Home/Home.html";

	  });
	};
});
