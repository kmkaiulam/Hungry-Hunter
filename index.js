const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const GEOCODE_SEARCH_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

//locationGeo is an object containing lat/lng
let oldQuery = "";
let searchLocationAddress = "";
let locationGeo = "";
let locationTest = "";

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


function retrieveAddressGooglePlacesData(locationTest, callPlacesData){
    const placesSearch = {
    query: `${locationTest}`,
    key: 'AIzaSyAMU9Dj6A_KxoL3zmCRfS5U8bi8WV-01Fc',
    radius: 6000, 
    type: 'coffee',
    opennow: true,
    callback:""
    };
    $.getJSON(PLACES_SEARCH_URL, placesSearch, callPlacesData);
}

/*
function retrieveGoogleGeocodingData(searchLocationGeo, callGeoData){
    const addressSearch = {
        key: 'AIzaSyAMU9Dj6A_KxoL3zmCRfS5U8bi8WV-01Fc',
        address: `${searchLocationGeo}` 
    };
    $.getJSON(GEOCODE_SEARCH_URL, addressSearch , callGeoData);
}

function callGeoData(data){
    console.log(data);
    locationGeoLat = data.results[0].geometry.location;
    console.log(locationGeo);
}
*/
function callPlacesData(data){
    console.log(data);
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
        locationTest = userQueryLocation;
    let nameLocation = userQueryLocation.split(' ');
        let locationAddress = nameLocation[0];
    for (let i = 1; i < nameLocation.length; i++) {
    locationAddress = `${locationAddress}+${nameLocation[i]}`; 
}
    searchLocationAddress = locationAddress;
//    retrieveGoogleGeocodingData(searchLocationGeo, callGeoData);
    retrieveAddressGooglePlacesData(locationTest, callPlacesData);
});
}
   //if results are valid then show buttons 
//        $('#buttonCoffee').prop('hidden',false);
//      $('#buttonSandwich').prop('hidden', false);
//    $('#buttonSushi').prop('hidden',false);

$(listenClick);
