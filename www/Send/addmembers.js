

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
}
