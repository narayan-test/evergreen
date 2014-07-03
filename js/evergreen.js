 
function openHome(){
        
    	 $.mobile.changePage("main.html", { transition: "slideup",reloadPage:true} );
         
    }
     function Sharedpage(){
         document.removeEventListener("backbutton", showConfirm, false);
         $.mobile.changePage("sharepage.html", { transition: "slideup",reloadPage:true} );
         document.addEventListener("backbutton", onBackKeyDown, false);
    }
     function backToHome(){
      // alert("call back button");
     document.removeEventListener("backbutton", backToHome, false); 
	$.mobile.changePage("main.html", { transition: "slideup",reloadPage:false} );
	// document.addEventListener("backbutton", backToHome, false); 
    }
  
    function openDirection(){
        // $.mobile.showPageLoadingMsg('a','Please Wait');
         document.removeEventListener("backbutton", showConfirm, false);
         $.mobile.changePage("opendirection.html", { transition: "slideup",reloadPage:true} );
          document.addEventListener("backbutton", onBackKeyDown, false);
          
       
         $(document).bind("pagecreate",function( event, data ){
          
             mapInitialize();
          $(document).unbind(event);
     });
         
    } 
   
    
 function openAdmin(){
        document.removeEventListener("backbutton", showConfirm, false);
        $.mobile.changePage("admission.html", { transition: "slideup",reloadPage:true} );
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

//Login method for REST API Call
 var hostUrl="http://fuelplatform.com/app/service.php?action=";
 function confirmLogin()
 {
         var URL = "http://fuelplatform.com/app/service.php?action=login&username=testuser&password=testuser";
        
         jQuery.ajax({
             type: 'POST',
             url: URL,
             dataType: 'json',

             success: function(data) {
                    
                 if(data.token!="")
                 {
                                       
                     window.localStorage.setItem("userid", 'testuser');
                     window.localStorage.setItem("password", 'testuser');
                     window.localStorage.setItem("token", data.token);
                      genralInformation(data.token);
                     console.log("data is " + JSON.stringify(data, null, 4));
                   
                }
             }
         });

    }

 
 // function for retrieve data from according to input
 function retrievefiledata() {
     $.mobile.changePage("openfiles.html", { transition: "slideup",reloadPage:true} );
     document.removeEventListener("backbutton", showConfirm, false);
     $(document).bind("pagecreate",function( event, data ){
         retrievefilejsondata();
         $(document).unbind(event);
         document.addEventListener("backbutton", onBackKeyDown, false);
     });
     
 }
 function retrievefilejsondata() {
    
     var get_nounce_url = "http://fuelplatform.com/app/service.php?action=retrieve&module=files&token="+window.localStorage.getItem("token");
     //console.log('get_nounce_url------>'+get_nounce_url);
     $.mobile.showPageLoadingMsg();
     jQuery.ajax({
         url: get_nounce_url,
         type: "POST",
         dataType: 'json',
         success: function(data){
             console.log("data is ---------------->" + JSON.stringify(data, null, 4)); 
             var files = {
        		row: []
            };
              for(var i=0;i<data.length;i++){
                  var file = data[i].fileurl;
                  var extension =file.substring(file.lastIndexOf(".")+1).toLowerCase();
               if(extension=="pdf"){
                   files.row.push({filename : data[i].filename,fileurl : data[i].fileurl,imgUrl:'img/pdf_logo.png'});
               }else{
                   files.row.push({filename : data[i].filename,fileurl : data[i].fileurl,imgUrl:''});
               }
             }
             $.mobile.hidePageLoadingMsg();
                 var dfd = jQuery.Deferred();
                 var source   = $("#openfiles-template").html();
                 var template = Handlebars.compile(source);
                 var blogData = template(files);
                 $('#openfiles-data').html(blogData);
                 $('#openfiles-data').trigger('create');
                 dfd.resolve(files);
                 return dfd.promise();
            
             
         },
         error: function(data){
             alert("User Data is not correct ");
         }
         
     });
 }

 function addContent(data) {

     console.log("data is " + JSON.stringify(data, null, 4));

 }
 function retrieveappdata() {
     $.mobile.changePage("endrosed.html", { transition: "slideup",reloadPage:true} );
     document.removeEventListener("backbutton", showConfirm, false);
     $(document).bind("pagecreate",function( event, data ){
         retrieveappjsondata();
         $(document).unbind(event);
          document.addEventListener("backbutton", onBackKeyDown, false);
     });
 }
 function retrieveappjsondata() {
     
     var get_nounce_url = "http://fuelplatform.com/app/service.php?action=retrieve&module=apps&token="+window.localStorage.getItem("token");
    // console.log('get_nounce_url------>'+get_nounce_url);
    var endrosed = {
		row: []
};
     jQuery.ajax({
         url: get_nounce_url,
         type: "POST",
         dataType: 'json',
         success: function(data){
              //console.log("index---------------->" + data[1].applicationurl.indexOf("play.google.com"));
             for(var i=0;i<data.length;i++){
                 if(data[i].applicationurl.indexOf("play.google.com")<1){
                 endrosed.row.push({title : data[i].title,iconurl : data[i].iconurl,applicationurl: "Download on Itunes",url:data[i].applicationurl });
                     }else{
                         endrosed.row.push({title : data[i].title,iconurl : data[i].iconurl,applicationurl: "Download on Android",url:data[i].applicationurl});
                     }
             }
            // console.log("data is apps module---------------->" + data.length);
             console.log("data is apps module---------------->" + JSON.stringify(endrosed, null, 4));  
             $.mobile.hidePageLoadingMsg();
             var dfd = jQuery.Deferred();
             var source   = $("#openapps-template").html();
             var template = Handlebars.compile(source);
             var blogData = template(endrosed);
             $('#openapps-data').html(blogData);
             $('#openapps-data').trigger('create');
             dfd.resolve(endrosed);
             return dfd.promise();
        
         
     },
            
         error: function(data){
             alert("User Data is not correct ");
         }
         
     });
 }
 
 function retrievecontactdata() {
    
     $.mobile.changePage("contact.html", { transition: "slideup",reloadPage:true} );
     document.removeEventListener("backbutton", showConfirm, false);
     $(document).bind("pagecreate",function( event, data ){
         //retrievecontactjsondata();
        openMapContactPage();
         $(document).unbind(event);
         document.addEventListener("backbutton", onBackKeyDown, false);
     });
 }
 function retrievecontactjsondata() {
     alert("retrievecontactjsondata");
     var get_nounce_url = "http://fuelplatform.com/app/service.php?action=retrieve&module=contacts&token="+window.localStorage.getItem("token");
     //console.log('get_nounce_url------>'+get_nounce_url);
    
     jQuery.ajax({
         url: get_nounce_url,
         type: "POST",
         dataType: 'json',
         success: function(data){
             console.log("data is contact module---------------->" + JSON.stringify(data, null, 4));  
             $.mobile.hidePageLoadingMsg();
             var dfd = jQuery.Deferred();
             var source   = $("#opencontacts-template").html();
             var template = Handlebars.compile(source);
             var blogData = template(data);
             $('#opencontacts-data').html(blogData);
             $('#opencontacts-data').trigger('create');
             dfd.resolve(data);
             return dfd.promise();
        
         },
         error: function(data){
             alert("User Data is not correct ");  
         }
         
     });
 }
 
 function retrieveeventdata() {
     $.mobile.changePage("openevent.html", { transition: "slideup",reloadPage:true} );
     document.removeEventListener("backbutton", showConfirm, false);
     $(document).bind("pagecreate",function( event, data ){
         retrieveeventjsondata();
         $(document).unbind(event);
         document.addEventListener("backbutton", onBackKeyDown, false);
     });
 }
 function retrieveeventjsondata() {
     
     var get_nounce_url = "http://fuelplatform.com/app/service.php?action=retrieve&module=events&token="+window.localStorage.getItem("token");
     //console.log('get_nounce_url------>'+get_nounce_url);
    
     jQuery.ajax({
         url: get_nounce_url,
         type: "POST",
         dataType: 'json',
         success: function(data){
             console.log("data is event module ---------------->" + JSON.stringify(data, null, 4));  
             $.mobile.hidePageLoadingMsg();
             var dfd = jQuery.Deferred();
             var source   = $("#openevents-template").html();
             var template = Handlebars.compile(source);
             var blogData = template(data);
             $('#openevents-data').html(blogData);
             $('#openevents-data').trigger('create');
             dfd.resolve(data);
             return dfd.promise();
         },
         error: function(data){
             alert("User Data is not correct ");  
         }
         
     });
 }
 function retrievetestimonialdata() {
     $.mobile.changePage("opentestimonial.html", { transition: "slideup",reloadPage:true} );
     document.removeEventListener("backbutton", showConfirm, false);
     $(document).bind("pagecreate",function( event, data ){
         retrievetestimonialjsondata();
         $(document).unbind(event);
         document.addEventListener("backbutton", onBackKeyDown, false);
     });
 }
 function retrievetestimonialjsondata() {
     
     var get_nounce_url = "http://fuelplatform.com/app/service.php?action=retrieve&module=testimonials&token="+window.localStorage.getItem("token");
     console.log('get_nounce_url------>'+get_nounce_url);
    
     jQuery.ajax({
         url: get_nounce_url,
         type: "POST",
         dataType: 'json',
         success: function(data){
             console.log("data is testimonial module ---------------->" + JSON.stringify(data, null, 4));  
             $.mobile.hidePageLoadingMsg();
             var dfd = jQuery.Deferred();
             var source   = $("#opentestimonials-template").html();
             var template = Handlebars.compile(source);
             var blogData = template(data);
             $('#opentestimonials-data').html(blogData);
             $('#opentestimonials-data').trigger('create');
             dfd.resolve(data);
             return dfd.promise();
         },
         error: function(data){
             alert("User Data is not correct ");  
         }
         
     });
 }

function addressreferal(data) {
    
var name = $("#username").val(); 
var phone = $("#phone").val(); 
var email = $("#email").val();
var message = $("#message").val();

     if(name=="")
     {
         alert("Please Enter Name");
         return false;
     }
     if(phone=="")
     {
         alert("Please Enter Phone Number");
         return false;
     }
      
    if(email=="")
     {
         alert("Please Enter email");
         return false;
     }
     if(email!="")
     {
         var x=email;
         var atpos=x.indexOf("@");
         var dotpos=x.lastIndexOf(".");
      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
       {
        alert("Not a valid e-mail address");
         return false;
       }
     }
    
    if(message=="")
     {
         alert("Please Enter Message");
         return false;
     }
     if(name!="" && phone!="" && email!="" && message!="")
     {
        // alert("calling login method========>");
        // message+="<br> Disclaimer : Please do not send personal or confidential information.";
         document.addEventListener("backbutton", onBackKeyDown, false);
         $.mobile.showPageLoadingMsg("a", "Loading...");
         var URL = hostUrl+'send&module=referrals&token=' +window.localStorage.getItem("token") + '&name=' + name + '&phone=' + phone + '&email=' + email + '&message=' + message;
         console.log(URL);
         jQuery.ajax({
             type: 'POST',
             url: URL,
             dataType: 'json',

             success: function(data) {
                 $.mobile.hidePageLoadingMsg();
                 alert(data.success);
                 $("#username").val(""); 
                 $("#phone").val(""); 
                 $("#email").val("");
                 $("#message").val("");
                 console.log("data is " + JSON.stringify(data, null, 4));
              
             }
         });

     }

 }

 
function retrievegenraldata() {
     $.mobile.changePage("sharepage.html", { transition: "slideup",reloadPage:true} );
     document.removeEventListener("backbutton", showConfirm, false);
     $(document).bind("pagecreate",function( event, data ){
         //retrievegenraljsondata();
         $(document).unbind(event);
         document.addEventListener("backbutton", onBackKeyDown, false);
     });
 }
 function genralInformation(token) {
    // confirmLogin();
     var get_nounce_url = "http://fuelplatform.com/app/service.php?action=retrieve&module=accountinformation&token="+token;
     //console.log('get_nounce_url------>'+get_nounce_url);
    
     jQuery.ajax({
         url: get_nounce_url,
         type: "POST",
         dataType: 'json',
         success: function(data){
             console.log("data is genral module---------------->" + JSON.stringify(data, null, 4));  
             $(jQuery.parseJSON(JSON.stringify(data))).each(function() {  
             var phoneNum = this.phonenumber;
             console.log("data is genral module phone---------------->" + phoneNum); 
             window.localStorage.setItem("phoneNumber", phoneNum);
             
            });
        },
         error: function(data){
             alert("User Data is not correct ");  
         }
         
     });
 }
 function phoneNumberCall(){
     var phone = window.localStorage.getItem("phoneNumber");
     var callTelephone = 'tel:'+ phone;
     window.open(callTelephone , '_system');
 }
function openwindow(){
                var ref = window.open('https://www.facebook.com/dialog/feed?app_id=&display=popup&caption=An%20example%20caption&link=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fdialogs%2F&redirect_uri=', '_blank', 'location=yes');
                    ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
                    ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
                    ref.addEventListener('exit', function() { alert(event.type); });
}