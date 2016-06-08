/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    // Application Constructor

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.

    document.addEventListener('deviceready', this.onDeviceReady, false);
    $(".Signup").click(function(){

      $(this).css({"color":"#ec4b57"})
      $(this).css({"border-bottom":"8px solid #ec4b57"})
      $(".Signin").css({"color":"white"})
      $(".Signin").css({"border-bottom":"0"})
      $(".RightDiv").css({"left":"0"})
      $(".LeftDiv").css({"display":"none"})
      $(".RightFooter").css({"left":"0"})
      $(".LeftFooter").css({"display":"none"})



    })

    $(".Signin").click(function(){

      $(this).css({"color":"#ec4b57"})
      $(this).css({"border-bottom":"8px solid #ec4b57"})
      $(".Signup").css({"color":"white"})
      $(".Signup").css({"border-bottom":"0"})
      $(".RightDiv").css({"left":"100%"})
      $(".LeftDiv").css({"display":"block"})
      $(".RightFooter").css({"left":"100%"})
      $(".LeftFooter").css({"display":"block"})

    })


$("#signin").click(function(){

  window.location = 'Home/home.html'


})


    /*auth.onAuthStateChanged(function(user){
      if(user){
        alert("su");
      }else {
        alert("f");
      }
    });*/



    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    // Update DOM on a Received Event
