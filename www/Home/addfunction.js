function add2Memories(firstName,firstDate,firstIcon,image,secondName,secondDate,secondIcon,image){
  var divs ="<li>"+
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
