function add2Memories(firstName,firstDate,firstIcon,image1,secondName,secondDate,secondIcon,image){
  var divs ="<li>"+
    "<div id=\"box1\" class=\"box\" style='background-image:url("+image1+")' rel=\"first-child\">"
    +
      "<div class=\"filter\">"
      +

      "</div>"
      +
      "<div id=\"inside1\" class=\"inside\">"+

        "<br>"
        +
        "<div id=\"sender\">"
        +
          "@"+firstName+
        "</div>"
        +
        "<div id=\"Date\" class=\"date\">"
        + firstDate
        +
        "</div>"+
        "<div id=\"opened\">"
        +
          "<img src=\"img/" + firstIcon + ".png \"  />"
          +

        "</div>"
+
      "</div>"
      +

    "</div>"

  +
  "<div id=\"box1\" class=\"box\" style='background-image:url("+image+")'>"
  +
    "<div class=\"filter\">"
    +

    "</div>"
    +
    "<div id=\"inside1\" class=\"inside\">"+

      "<br>"
      +
      "<div id=\"sender\">"
      +
        "@"+secondName+
      "</div>"
      +
      "<div id=\"Date\" class=\"date\">"
      + secondDate
      +
      "</div>"+
      "<div id=\"opened\">"
      +
        "<img src=\"img/" +secondIcon + ".png \"  />"
        +

      "</div>"
+
    "</div>"
    +

  "</div>"

+
  "</li>"

  $("#body1").append(divs);


}


function add1Memories(firstName,firstDate,firstIcon,image1,uid){
  var divs ="<li>"+
    "<div id=\"box1\" class=\"box\" style='background-image:url("+image1+")' rel="+uid+">"
    +
      "<div class=\"filter\">"
      +

      "</div>"
      +
      "<div id=\"inside1\" class=\"inside\">"+

        "<br>"
        +
        "<div id=\"sender\">"
        +
          "@"+firstName+
        "</div>"
        +
        "<div id=\"Date\" class=\"date\">"
        + firstDate
        +
        "</div>"+
        "<div id=\"opened\">"
        +
          "<img src=\"img/" + firstIcon + ".png \"  />"
          +

        "</div>"
+
      "</div>"
      +

    "</div>"
    +


    "<div id=\"box2\" class=\"box box2\" style='background-image:url(\"\"); opacity:0' atrr = \'empty\' rel=\'second-child\'>"
    +
      "<div class=\"filter\">"
      +

      "</div>"
      +
      "<div id=\"inside1\" class=\"inside\">"+

        "<br>"
        +
        "<div id=\"sender2\">"
        +
          "@"+firstName+
        "</div>"
        +
        "<div id=\"Date2\" class=\"date\">"
        + firstDate
        +
        "</div>"+
        "<div id=\"opened\">"
        +
          "<img src=\"img/" + firstIcon + ".png \"  />"
          +

        "</div>"
+
      "</div>"
      +

    "</div>"




+
  "</li>"


    var li = $("li")
    var length = li.length
    if(length>0){
      var lastLi = li.eq(length-1)
      var child =lastLi.children(".box2")
      if(child.css('opacity') == 0 ){

        child.css({"opacity":"1"})

        child.css({"background-image":"url("+image1+")"})
        child.children(".inside").children("#sender2").html("@"+firstName)
        child.children(".inside").children(".date").html(firstDate)
        child.attr('rel',uid)






      }else{
        $("#body1").append(divs);

      }
    }else{
      $("#body1").append(divs);


    }
  





}
