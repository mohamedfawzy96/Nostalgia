function Memory (name, size, type, filetype, url, effect, privateattr, caption, reposts, comments, members, date, owner, lastModifiedDate){
  this.name = name;
  this.size = size;
  this.type = type||'n/a';
  this.filetype = filetype;
  this.url = url;
  this.effect = effect;
  this.private = privateattr;
  this.caption = caption;
  this.reposts = reposts;
  this.comments = comments;
  this.members = members;
  this.date = date;
  this.owner = owner;
  //owner : database.ref().child('users').child(user.uid).username,
  this.lastModifiedDate = lastModifiedDate;
};

function comment(user, data){
  this.user = user;
  this.data = data;
};

function User (email, uid, username, posted, memberposted, member, tagged, followers, following, settings){
  this.email = email;
  this.uid = uid;
  this.username = username;
  this.posted = posted;
  this.memberposted = memberposted;
  this.member = member;
  this.tagged = tagged;
  this.followers = followers;
  this.following = following;
  this.settings = settings;
};
