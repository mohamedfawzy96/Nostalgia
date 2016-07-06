
function addreco(url,url){
    var html =   "<div rel="+url+" class='imgreco' style='background-image: url("+url+");'>     </div>"
    $(".imgrecodiv").append(html)
    
    
    
}




var getfb = function (i) {
    if(i == 5){
        return
    }
    facebookConnectPlugin.api( "me?fields=photos", ["user_photos"],
                              function (response) { //alert(JSON.stringify(response))
                              var length = response.photos.data.length
                              facebookConnectPlugin.api( response.photos.data[length-i].id+"?fields=images", ["user_photos"],
                                                        function (response) { //alert(JSON.stringify(response))
                                                        //alert(response.images[0].source)
                                                        if(i == 1){
                                                        $(".photo img").attr("src",response.images[0].source)
                                                        }
                                                        addreco(response.images[0].source,response.images[0].source)
                                                        i++;
                                                        getfb(i)
                                                        
                                                        
                                                        
                                                        
                                                        },
                                                        function (response) { alert(JSON.stringify(response)) });
                              
                              
                              },
                              function (response) { alert(JSON.stringify(response)) }); }
