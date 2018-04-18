const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/output';
//locationGeo is an object containing lat/lng
let oldQuery = "";
let locationGeo = "";
let map = "";
let geocoder = new google.maps.Geocoder();
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
/*geocoder = new retrieveGoogleGeocodingData.maps.Geocoder();
function getCoordinates(address) {
    geocoder.geocode({'address': address}, function (results, status))
}
*/
// plug in the locationGeo
function retrieveNearbyGooglePlacesData(searchTerm, callback){
    const placesSearch = {
    key: 'AIzaSyA0Fr_D8DfctwBvp2kLFSmkPlcibgKRpKE',
    location: locationGeo,
    radius: 4500, 
    opennow: true,
    };
    $.getJSON(PLACES_SEARCH_URL, placesSearch, callback);
}


//Accept user input for address and converts to location coordinates using the geocoding API
function listenAddressSubmit(){
    $('.js-search-form').submit(event =>{
        event.preventDefault();
        const userInput =$(event.currentTarget).find('.js-query');
        const userQueryLocation = userInput.val();
        userInput.val("");
//call function here that accepts parameter of userQueryLocation to convert 'userQueryLocation' into Coordinates, passing the conditional of being a valid address, continue onwards       
        $('#buttonCoffee').prop('hidden',false);
        $('#buttonSandwich').prop('hidden', false);
        $('#buttonSushi').prop('hidden',false);
console.log('This function accesses the ability to convert addresses to lat and longitude');
});
}

function convertAddressToCoord(userQueryLocation){
    console.log('This function converts addresses to lat and longitude for use in search');    
    geocoder.geocode( { 'address': userQueryLocation}, function(results, status) {
            if (status == 'OK') {
                locationGeo = results[0].geometry.location;
            }
            else {
                alert('Not a valid address. Please enter a valid input ex. 123 Street Address, City Name, State');
            }
        });
    }



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
    listenUserAddress();
    listenCoffee();
    listenSandwich();
    listenSushi();
}

function listenSubmit(){
    $('.js-search-form').submit(event =>{
        event.preventDefault();
        console.log("button clicked");
        const queryTarget =$(event.currentTarget).find ('.js-query');
        const query = queryTarget.val();
        oldQuery = query;
        queryTarget.val("");
       // retrieveYoutubeData(query, displayYoutubeSearchData,"");

});
}

$(listenClick);
$(listenAddressSubmit);