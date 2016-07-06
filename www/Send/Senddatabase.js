

	$(document).on('tap', '.go111', function(){
	$('#file').trigger('click');

});
var facebook = false;

$("#file").change(function () {
	facebook = false;

		file = document.getElementById('file').files[0];
		var photo = $('.photo img')
	EXIF.getData(file, function () {
		    var ori = this.exifdata.Orientation;
				var ctx = $(".photo")
				alert(ori)
				switch(ori){
    case 2:
        //ctx.scale(-1, 1);
        break;
    case 3:
        // 180° rotate left
        photo.css({"transform":"rotate(-180deg)"})
        break;
    case 4:
        // vertical flip
        ctx.scale(1, -1);
        break;
    case 5:
        // vertical flip + 90 rotate right
				//photo.css({"width":"rotate(90deg)"})

				photo.css({"transform":"rotate(90deg)"})

        break;
    case 6:
        // 90° rotate right
				photo.css({"transform":"rotate(90deg)"})
        break;
    case 7:
        // horizontal flip + 90 rotate right
				photo.css({"transform":"rotate(90deg)"})

        break;
    case 8:
        // 90° rotate left
				photo.css({"transform":"rotate(-90deg)"})
        break;
}

		});
	    //alert(jQuery(this).val());
	   	//alert(file);
	   	readURL(this);
	});
	function readURL(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
				$('.photo img').attr("src", e.target.result);
	        }
	        reader.readAsDataURL(input.files[0]);
	    }
	}

	function finalize(){
		 facebook = true;

	    var user = firebase.auth().currentUser;
			var username;
			var users = database.ref().child("users");
			var userInDatabase = users.child(user.uid).child("username");
      userInDatabase.once('value',function(snapshot){
				username = snapshot.val();
			});
			if(facebook==false) {

				var file = document.getElementById('file').files[0];
				var imageRef = storageRef.child('memories/'+file.name);
				var uploadTask = imageRef.put(file);
				uploadTask.on('state_changed', function(snapshot) {
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
				var imagesRef = database.ref().child('memories');
				var userImagesRef = imagesRef.child(user.uid);

				$( ".content li" ).each(function(index) {
					if($(this).attr('class')=="checked"){
						//alert($(this).attr('rel'));
						membersArray.push($(this).attr('rel'));
					}
				});
					//alert(membersArray);
					alert(username)

					captionattr = $("#caption3").val()
					var newmemory = new Memory(file.name, file.size, file.type, 'image',
					uploadTask.snapshot.downloadURL, effectattr, privateattr, captionattr, 0,
					null, null, date, username, user.uid,(file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a'));
					var key = imagesRef.push();
					key.child("comments").child("0").set("hello");
					//alert(membersArray.length);
					key.set(newmemory);
					//alert(key);
					var notificationkey = database.ref().child('notifications').push();
					notificationkey.set({
						subject: user.uid+'',
						subjectname: username,
						memoryid: ((key +'').split("/").pop()),
						type: "posted",
						checked: "false"
					});
					for (var i = 0; i < membersArray.length; i++) {
						//alert(membersArray[i]);
						key.child("members").child(i).set(membersArray[i]);
						var index = membersArray[i];
						var notificationsnum;
						var ref = database.ref().child("users").child(membersArray[i]).once('value',
						function(memberToSnap){
							var key3 = (key +'').split("/").pop();
							database.ref().child("users").child(index).child("member").once('value',function(membersnapshot) {
									var num = membersnapshot.numChildren();
									database.ref().child("users").child(index).child("member").child(num).set(((key +'').split("/").pop()));
								});
								notificationsnum = memberToSnap.child('notifications').numChildren();
							}).then(function(){
								database.ref().child("users").child(index).child("memberposted").once('value',function(memberpostedsnapshot){
									var num2 = memberpostedsnapshot.numChildren();
									database.ref().child("users").child(index).child("memberposted").child(num2).set(((key +'').split("/").pop()));
								}).then(function(){
									alert("success");
								});
								database.ref().child('users').child(index).child('notifications').child(notificationsnum+'').set((notificationkey+'').split('/').pop());
							});
						};

						users.child(user.uid).child('friends').on('child_added', function(friendsuidsnap){
							var frienduid = friendsuidsnap.val();
							var friendfeelitnum;
							users.child(frienduid).child('feelit').once('value', function(feelitsnap){
								friendfeelitnum = feelitsnap.numChildren();
							}).then(function(){
								users.child(frienduid).child('feelit').child(friendfeelitnum).set(((key +'').split("/").pop()));
							});
						});

						users.child(user.uid).once('value', function(usersnap){
							var num = usersnap.child("memberposted").numChildren();
							users.child(user.uid).child("memberposted").child(num).set(((key +'').split("/").pop()));
						}).then(function(){
							key2 = (key +'').split("/").pop();
							users.child(user.uid).child("posted").once('value',function(snapshot){
									var num = snapshot.numChildren();
									users.child(user.uid).child("posted").child(num).set(key2);
							}).then(function(){
								users.child(user.uid).child("member").once('value',function(postedsnapshot){
									var num2 = postedsnapshot.numChildren();
									users.child(user.uid).child("member").child(num2).set(key2);
								}).then(function(){
									window.location = "../Home/home.html";
								});
							});
						});
					});

			} else {
				userInDatabase.once('value',function(snapshot){
					username = snapshot.val();


				var imagesRef = database.ref().child('memories');
				var userImagesRef = imagesRef.child(user.uid);
				$( ".content li" ).each(function(index) {
					if($(this).attr('class')=="checked"){
						//alert($(this).attr('rel'));
						membersArray.push($(this).attr('rel'));
					}
				});
					//alert(membersArray);
					userInDatabase.once('value',function(snapshot){
						username = snapshot.val();
					});
					//alert(username)
					var url = $(".photo img").attr("src")+"";
					var newmemory = new Memory("null", null, null, 'image',url, effectattr, privateattr, captionattr, 0,null, null, date, username, user.uid,null);
					var key = imagesRef.push();
					//alert(membersArray.length);
					alert(key)

					key.set(newmemory);

					//alert(key);
					var notificationkey = database.ref().child('notifications').push();
					notificationkey.set({
						subject: user.uid+'',
						subjectname: username,
						memoryid: ((key +'').split("/").pop()),
						type: "posted",
						checked: "false"
					});
					for (var i = 0; i < membersArray.length; i++) {
						//alert(membersArray[i]);
						key.child("members").child(i).set(membersArray[i]);
						var index = membersArray[i];
						var notificationsnum;
						var ref = database.ref().child("users").child(membersArray[i]).once('value',
						function(memberToSnap){
							var key3 = (key +'').split("/").pop();
							database.ref().child("users").child(index).child("member").once('value',function(membersnapshot) {
									var num = membersnapshot.numChildren();
									database.ref().child("users").child(index).child("member").child(num).set(((key +'').split("/").pop()));
								});
								notificationsnum = memberToSnap.child('notifications').numChildren();
							}).then(function(){
								database.ref().child("users").child(index).child("memberposted").once('value',function(memberpostedsnapshot){
									var num2 = memberpostedsnapshot.numChildren();
									database.ref().child("users").child(index).child("memberposted").child(num2).set(((key +'').split("/").pop()));
								}).then(function(){
									alert("success");
								});
								database.ref().child('users').child(index).child('notifications').child(notificationsnum+'').set((notificationkey+'').split('/').pop());
							});
						};

						users.child(user.uid).child('friends').on('child_added', function(friendsuidsnap){
							var frienduid = friendsuidsnap.val();
							var friendfeelitnum;
							users.child(frienduid).child('feelit').once('value', function(feelitsnap){
								friendfeelitnum = feelitsnap.numChildren();
							}).then(function(){
								users.child(frienduid).child('feelit').child(friendfeelitnum).set(((key +'').split("/").pop()));
							});
						});

						users.child(user.uid).once('value', function(usersnap){
							var num = usersnap.child("memberposted").numChildren();
							users.child(user.uid).child("memberposted").child(num).set(((key +'').split("/").pop()));
						}).then(function(){
							key2 = (key +'').split("/").pop();
							users.child(user.uid).child("posted").once('value',function(snapshot){
									var num = snapshot.numChildren();
									users.child(user.uid).child("posted").child(num).set(key2);
							}).then(function(){
								users.child(user.uid).child("member").once('value',function(postedsnapshot){
									var num2 = postedsnapshot.numChildren();
									users.child(user.uid).child("member").child(num2).set(key2);
								}).then(function(){
									window.location = "../Home/home.html";
								});
							});
					});
				});

			}



	};
