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
var app = {
   // Application Constructor
   initialize: function() {
       this.bindEvents();
   },
   // Bind Event Listeners
   //
   // Bind any events that are required on startup. Common events are:
   // 'load', 'deviceready', 'offline', and 'online'.
   bindEvents: function() {
       document.addEventListener('deviceready', this.onDeviceReady, false);
   },
   // deviceready Event Handler
   //
   // The scope of 'this' is the event. In order to call the 'receivedEvent'
   // function, we must explicity call 'app.receivedEvent(...);'
   onDeviceReady: function() {
       app.receivedEvent('deviceready');
       
       
        $.mobile.changePage( "main.html", { transition: "slideup", changeHash: false });
        document.addEventListener("backbutton", showConfirm, false);
         confirmLogin();
       
       
        
     
   },
   // Update DOM on a Received Event
   receivedEvent: function(id) {
       var parentElement = document.getElementById(id);
      /* var listeningElement = parentElement.querySelector('.listening');
       var receivedElement = parentElement.querySelector('.received');

       listeningElement.setAttribute('style', 'display:none;');
       receivedElement.setAttribute('style', 'display:block;');*/

       console.log('Received Event: ' + id);
   }
};

 function showConfirm() {
navigator.notification.confirm(
'Do you really want to exit?', // message
exitFromApp, // callback to invoke with index of button pressed
'Exit', // title
'No,Yes' // buttonLabels
);
}
 
function exitFromApp(buttonIndex) {
if (buttonIndex==2){
navigator.app.exitApp();
}}
function closeApp() {
    // Handle the back button
    navigator.app.exitApp();
}

function onBackKeyDown() {
    // Handle the back button
    
     $.mobile.changePage( "main.html", { transition: "slideup", reloadPage:false });
     document.addEventListener("backbutton", showConfirm, false);
}



function changeImg(){
    console.log("images is changing");
        $("#th1_td1_img1").hide();
        $("#th1_td1_img2").show();
        console.log("table td1 ending");

}

function openDialog2(urlData,filename){
    var extention = urlData.substring(urlData.lastIndexOf('.') + 1).toLowerCase();
    // alert(extention);
    if(extention == "pdf"){
       //  alert(urlData);
         window.plugins.fileOpener.open(urlData);
        
    }else{
        
         var imagepath = "<img src="+urlData+" style=\"width:300px;height:305px;padding-bottom: 0px;margin-top:-12px;\">";
         $("#showImage").html(imagepath);
         $("#popupDialog").show();
          //alert(extention);
    }
   
    }
  var DATADIR;
 function downloadFiles(url,file)
{
    window.localStorage.setItem("url", url);
    window.localStorage.setItem("file", file);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, null); 
}  
function onFSSuccess(fileSystem) {
  dirPath="Download/EverGreen";
   if(device.platform != "Android"){
       dirPath="EverGreen";
   }
   fileSystem.root.getDirectory(dirPath,{create:true},gotDir,onError);
}
function gotDir(d){
    DATADIR = d;
      var file = window.localStorage.getItem("file");
    console.log("Url is --------------->"+file);
    var extension =file.substring(file.lastIndexOf(".")+1).toLowerCase();
    file = file.substring(0,file.lastIndexOf("."));
    if(extension=='pdf'){
        file=file.replace(/\./g, '');
         console.log("extension --------------->"+extension);
        }
    console.log("Name  is --------------->"+file);
    console.log("calling download files----------------"+DATADIR.fullPath);
    var fileTransfer = new FileTransfer();
    $.mobile.showPageLoadingMsg("a", "Loading...");
    fileTransfer.download(
    window.localStorage.getItem("url"),
    DATADIR.fullPath + "/"+file+"."+extension,
    function(entry) {
        
             alert('File downloaded successfully');
       //alert("see file on : "+entry.fullPath);
         $.mobile.hidePageLoadingMsg();
        console.log("download complete: " + entry.fullPath);
        console.log(entry.fullPath.substring(entry.fullPath.lastIndexOf(".")+1));
        if(entry.fullPath.substring(entry.fullPath.lastIndexOf(".")+1).toLowerCase()=="pdf" && device.platform == "Android"){
            console.log("if condition--------------");
             window.open(entry.fullPath,'_system');
             
            }else{
                window.open( entry.fullPath, "_blank");
               

            }
       
    },
    function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
        $.mobile.hidePageLoadingMsg();
    }    
);
    
}

function onError(e){
    console.log("ERROR");
    console.log(JSON.stringify(e));
}
 

function openLink(link){
    //alert(link.substring(link.lastIndexOf("//")+2));
    window.open(link, "_blank");
   
  }
function opengmail(mailid){
    alert(mailid);
   window.open(mailid, '_blank'); 
}
function closeDialog(){
    //alert("Hello");
 $("#popupDialog").hide();
    }