const GEOCODE_SEARCH_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

//locationGeo is an object containing lat/lng
let oldQuery = "";
let searchLocationGeo = "";
let map = "";
let locationGeo="";
let service = "";
let infoWindow = "";

//variable 'locationGeo will be defined by userInput'

//userInput will be converted to coordinates by the google Maps Geocoding API
//upon user input buttons will appear for user to click on 
// and then upon click of button --> the getJSON will run to indicate what data I want to map
// display results in DOM 

/*
//display google map of area in the DOM based on user search
function displayMap(locationGeo){
    let mapFocus = new retrieveGoogleGeocodingData.maps.LatLng(`${locationGeo}`);
        map = new retrieveGoogleGeocodingData.maps.Map(document.getElementById('#js-search-map'), {
            mapFocus : mapFocus,
            zoom: 13
        });
    }
*/




function retrieveGoogleGeocodingData(searchLocationGeo, callGeoData){
    const addressSearch = {
        key: 'AIzaSyAMU9Dj6A_KxoL3zmCRfS5U8bi8WV-01Fc',
        address: `${searchLocationGeo}` 
    };
    $.getJSON(GEOCODE_SEARCH_URL, addressSearch , callGeoData);
}

function callGeoData(data){
    console.log(data);
   locationGeo = data.results[0].geometry.location
    let locationGeoLat = data.results[0].geometry.location.lat;
    let locationGeoLng = data.results[0].geometry.location.lng;
    generateMap(locationGeo, locationGeoLat, locationGeoLng);
}


function generateMap(locationGeo, locationGeoLat, locationGeoLng)   
    let userGeoLocation = new google.maps.LatLng(locationGeoLat, locationGeoLng);
    map = new google.maps.Map(document.getElementById('#map'), {
        center : locationGeo,
        zoom: 17
    }); 
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    let request = {
        location: locationGeo,
        radius: '1500',
        type: ['restaurant']
    };
service.nearbySearch(request, callback);




function callback(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.Ok) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
}
/*
function renderMap(){
    console.log("renderMaps");
}

//on click event listener to generate all sandwich shops in the area + reviews + hours and 'traffic': use font awesome icon
function  renderSandwichShops(){
    console.log('renderSandwichShops ran');
}
//on click event listener to generate all sandwich shops in the area + reviews + hours and 'traffic': use font awesome icon
function renderCoffeeShops(){
    console.log('renderCoffeeShops ran');
}
//on click event listener to generate all sandwich shops in the area + reviews + hours and 'traffic' : use font awesome icon
function renderSushi(){
    console.log('renderSushi ran');
}
*/
// EVENT LISTENERS SECTION
function listenCoffee(){
    $('#buttonCoffee').click(event =>{
        event.preventDefault();
        console.log('listenCoffee ran');
});
}
function listenSandwich(){
    $('#buttonSandwich').click(event =>{
        event.preventDefault();
        console.log('listenSandwich works!');
});
}

function listenSushi(){
    $('#buttonSushi').click(event =>{
        event.preventDefault();
        console.log('listenSushi ran!');
});
}

function listenClick(){
    listenAddressSubmit();
    listenCoffee();
    listenSandwich();
    listenSushi();
}

function listenAddressSubmit(){
    $('.js-search-form').submit(event =>{
        event.preventDefault();
        const userInput =$(event.currentTarget).find('.js-query');
        const userQueryLocation = userInput.val();
        userInput.val("");
    //Convert userInput into array and then into portion of web address
        let nameLocation = userQueryLocation.split(' ');
        let locationAddress = nameLocation[0];
    for (let i = 1; i < nameLocation.length; i++) {
    locationAddress = `${locationAddress}+${nameLocation[i]}`; 
}
    searchLocationGeo = locationAddress;
    retrieveGoogleGeocodingData(searchLocationGeo, callGeoData);
});
}
   //if results are valid then show buttons 
//        $('#buttonCoffee').prop('hidden',false);
//      $('#buttonSandwich').prop('hidden', false);
//    $('#buttonSushi').prop('hidden',false);

$(listenClick);
