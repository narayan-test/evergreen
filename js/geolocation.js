
var lat;
var lng;

var latitudeValue;
var longitudeValue;
/****---------------------------------------------------------------------------------------------------------*****/
var isPresent = true;
var quickAddress;

function mapInitialize() {
    confirmLogin();
    var get_nounce_url = "http://fuelplatform.com/app/service.php?action=retrieve&module=contacts&token=" + window.localStorage.getItem("token");
    //console.log('get_nounce_url------>'+get_nounce_url);
    isPresent = true;
    jQuery.ajax({
        url: get_nounce_url,
        type: "POST",
        dataType: 'json',
        success: function(data) {
             console.log("data is contact module---------------->" + JSON.stringify(data, null, 4));  
            quickAddress = data;
            $("#mapdiv").show();
            setLatiLontudeValue();
        },
        error: function() {
            alert("User Data is not correct ");  
        }
         
    });
}

function setLatiLontudeValue() {
    //  console.log("Latitude S -------------------->"+latValue);
    // console.log("Longititude S -------------------->"+lonValue);
    var map = new google.maps.Map(document.getElementById("mapdiv"), {
        // center: new google.maps.LatLng(latValue,lonValue),
        zoom:40,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    //
    // initialize marker
    //
    center = new google.maps.LatLng('41.807010','-71.344147');
    var marker = new google.maps.Marker({
        position: center,
        draggable: false,
        map: map
    });
    //

    marker.setMap(map);
    var infowindow = new google.maps.InfoWindow();
    infowindow.open(map, marker);
    
    // intercept map and marker movements
    //
    google.maps.event.addListener(map, "idle", function() {
        marker.setPosition(center);
        //document.getElementById("mapoutput").innerHTML = "<a href=\"#" + encodeURIComponent(map.getCenter().toUrlValue()) + "\" type=\"button\"onclick=\"getPosition();\" style=\"float: right;margin-right:20px;margin-top:7px;color:red;\">My Position</a>Lat: " + map.getCenter().lat().toFixed(6) + "<br>Lon: " + map.getCenter().lng().toFixed(6);
    });
    google.maps.event.addListener(marker, "dragend", function(mapEvent) {
        map.panTo(mapEvent.latLng);
    });
    //
    // initialize geocoder
    //
    var geocoder = new google.maps.Geocoder();
    myAddress = "street : " + quickAddress.street1 + ", city : " + quickAddress.city + ", state: " + quickAddress.state + ", zipcode: " + quickAddress.zipcode;
    //console.log("myAddress-------------------->"+myAddress);
    geocoder.geocode({
        address: myAddress
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var result = results[0];
            window.localStorage.setItem("lat", results[0].geometry.location.lat());
            window.localStorage.setItem("lng", results[0].geometry.location.lng());
            center = new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng());
            var link;
           if(device.platform != "Android"){
                link = "<a href='maps:q="+myAddress+"&ll=41.807010,-71.344147;u=35&ll=41.807010,-71.344147;u=35' style='color:#000;text-decoration:none;word-wrap:break-word;width:100%'>" + quickAddress.quickcontactinformation + "</a>";
               }else{
                   link = "<a href='geo:0,0?q=41.807010,-71.344147' style='color:#000;text-decoration:none;word-wrap:break-word;width:100%'>" + quickAddress.quickcontactinformation + "</a>";
           // link = "<a href=geo:0,0?q=41.8164902,-71.36462360000002 style=color:#000;text-decoration:none;word-wrap:break-word;width:100%>" + quickAddress.quickcontactinformation + "</a>";
                   
            }
            
            $('#address').html(link);
            console.log("link---------------------------->" + link);
            if (result.geometry.viewport) {
                map.fitBounds(result.geometry.viewport);
            }
            else {
                map.setCenter(result.geometry.location);
            }
        }
        else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
            alert("Sorry, the geocoder failed to locate the specified address.");
        }
        else {
            alert("Sorry, the geocoder failed with an internal error.");  
        }
    });
}
function openMapContactPage() {
   
    var get_nounce_url = "http://fuelplatform.com/app/service.php?action=retrieve&module=contacts&token=" + window.localStorage.getItem("token");
    //console.log('get_nounce_url------>'+get_nounce_url);
    isPresent = true;
    jQuery.ajax({
        url: get_nounce_url,
        type: "POST",
        dataType: 'json',
        success: function(data) {
            // console.log("data is contact module---------------->" + JSON.stringify(data, null, 4));  
            quickAddress = data;
            setMapAddressValue();
        },
        error: function() {
            alert("User Data is not correct ");  
        }
         
    });
}
function setMapAddressValue() {
    
    var geocoder = new google.maps.Geocoder();
    myAddress = "street : " + quickAddress.street1 + ", city : " + quickAddress.city + ", state: " + quickAddress.state + ", zipcode: " + quickAddress.zipcode;
    console.log("myAddress setMapAddressValue -------------------->"+myAddress);
    email="email : "+quickAddress.email;    
    var emaillink="<a href=mailto:"+quickAddress.email+" style=color:#000;text-decoration:none;word-wrap:break-word;width:100%>"+quickAddress.email+"</a>"; 
    $('#emailid').html(emaillink);
    console.log("email link setMapAddressValue---------------------------->"+emaillink);
    geocoder.geocode({
        address: myAddress
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var result = results[0];
            window.localStorage.setItem("lat", results[0].geometry.location.lat());
            window.localStorage.setItem("lng", results[0].geometry.location.lng());
            
           // var link = "<a href=geo:" + results[0].geometry.location.lat() + "," + results[0].geometry.location.lng() + " style=color:#000;text-decoration:none;word-wrap:break-word;width:100%>" + quickAddress.quickcontactinformation + "</a>";
           var link;
           if(device.platform != "Android"){
              // link = "<a href=maps:q="+myAddress+"&ll=41.807010,-71.344147;u=35 style=color:#000;text-decoration:none;word-wrap:break-word;width:100%>" + quickAddress.quickcontactinformation + "</a>";
             link = "<a href='maps:q="+myAddress+"&ll=41.807010,-71.344147;u=35&ll=41.807010,-71.344147;u=35' style='color:#000;text-decoration:none;word-wrap:break-word;width:100%'>" + quickAddress.quickcontactinformation + "</a>";  
           }else{
            link = "<a href='geo:0,0?q=41.807010,-71.344147' style='color:#000;text-decoration:none;word-wrap:break-word;width:100%'>" + quickAddress.quickcontactinformation + "</a>";
            }
            $('#address').html(link);
            console.log("link---------------------------->" + link);
           
            if (result.geometry.viewport) {
                //map.fitBounds(result.geometry.viewport);
            }
            else {
               // map.setCenter(result.geometry.location);
            }
        }
        else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
            alert("Sorry, the geocoder failed to locate the specified address.");
        }
        else {
            alert("Sorry, the geocoder failed with an internal error.");  
        }
    });
}