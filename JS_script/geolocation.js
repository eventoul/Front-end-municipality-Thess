/**
 * Geolocation API και Geocoding API
**/

// Αρχικοποίηση-εμφάνιση του χάρτη
function initMap() {
    // Κέντρο του χάρτη η Θεσσαλονίκη (συντεταγμένες).
    var myLatlng = { lat: 40.629269, lng: 22.947412 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13, 
        center: myLatlng,
        mapTypeControl: true,
        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
        streetViewControl: true
    });

    // Geocoder constructor object. Για την μετατρωπή της διεύθυνσης που έχει εισάγει ο χρήστης σε σημείο "mark" στο χάρτη. 
    var geocoder = new google.maps.Geocoder();

    document.getElementById("submmitTypeAddress").addEventListener("click", function() {
        geocodeAddress(geocoder, map);
    });

    // Create the initial InfoWindow.
    var infoWindow = new google.maps.InfoWindow({});

    infoWindow.open(map);

    // Configure the click listener.
    map.addListener('click', function(mapsMouseEvent) {
        // Close the current InfoWindow.
        infoWindow.close();

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
        infoWindow.setContent("Η θέση της βλάβης");
        infoWindow.open(map);                    
        
        // Κλήση της cutString για την αφαίρεση των παρενθέσεων από τις συντεταγμένες.
        var resultString = cutString(mapsMouseEvent.latLng.toString());
        document.getElementById("address").value = resultString;
    });
}

// Με το κουμπί που έχει δημιουργηθεί λαμβάνει την τοποθεσή του χρήστη καλώντας την showPosition
function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

// Καλείται από την getLocation για την λήψη της θέσης του χρήστη.
function showPosition(position) {

    var latLong = { lat: position.coords.latitude, lng: position.coords.longitude};
    var map = new google.maps.Map(
        document.getElementById('map'), 
        {
            zoom: 18, 
            center: latLong,
            mapTypeControl: true,
            mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
            streetViewControl: true
        }
    );
    
    var infoWindow = new google.maps.InfoWindow({content: "Η θέση της βλάβης", position: latLong});

    infoWindow.open(map);

    var resultString = cutString(map.center.toString());
    document.getElementById("address").value = resultString;

    // Configure the click listener.
    map.addListener('click', function(mapsMouseEvent) {
        // Close the current InfoWindow.
        infoWindow.close();

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
        infoWindow.setContent("Η θέση της βλάβης");
        infoWindow.open(map);                    

        // Κλήση της cutString για την αφαίρεση των παρενθέσεων από τις συντεταγμένες.
        var resultString = cutString(mapsMouseEvent.latLng.toString());
        document.getElementById("address").value = resultString;                     

    });
}

// Μηνύματα σφάλματος για τον χρήστη
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Άρνηση χρήσης της τοποθεσίας.")
        break;
        case error.POSITION_UNAVAILABLE:
            alert("Αδυναμία λήψης δεδομένων τοποθεσίας.")
        break;
        case error.TIMEOUT:
            alert("Παρέλευση χρονικού ορίου.")
        break;
        case error.UNKNOWN_ERROR:
            alert("Άγνωστο σφάλμα")
        break;
      }
}

// Geocode API. Μετατροπή της διεύθυνσης που έχει εισάγει ο χρήστης σε σημείο "mark" στο χάρτη.
function geocodeAddress(geocoder, resultsMap) {
    
    var address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === "OK") {
            
            resultsMap.setCenter(results[0].geometry.location);
            resultsMap.setZoom(18);

            var map = resultsMap;

            var infoWindow = new google.maps.InfoWindow({content: "Η θέση της βλάβης", position:results[0].geometry.location});
            infoWindow.open(map);

            // Configure the click listener.
            map.addListener('click', function(mapsMouseEvent) {
                // Close the current InfoWindow.
                infoWindow.close();

                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
                infoWindow.setContent("Η θέση της βλάβης");
                infoWindow.open(map);                    

                // Κλήση της cutString για την αφαίρεση των παρενθέσεων από τις συντεταγμένες.
                var resultString = cutString(mapsMouseEvent.latLng.toString());
                document.getElementById("address").value = resultString; 
            });
        } 
        else {
            alert("Δεν ήταν δυνατή η εύρεση της διεύθυνσης! Κωδικός σφάλματος: " + status);
        }
    });

}

// Αφαιρεί τις παρενθέσεις που έχουν οι συντεταγμένες.
function cutString(addressString) {
    var str = addressString;
    var res = str.replace("(", "");
    var newStr = res.replace(")", "");

    return newStr;   
}