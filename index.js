const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/output';

function retrieveGooglePlacesData(searchTerm, callback){
    const placesSearch = {
    query: `${searchTerm}`,
    key: 'AIzaSyA0Fr_D8DfctwBvp2kLFSmkPlcibgKRpKE',
    };
    $.getJSON(PLACES_SEARCH_URL, placesSearch, callback);


//Accept user input for city, state and convert to location coordinates using the geocoding API
function retrieveGoogleGeocodingData(){

}

function convertCityToCoord(){

}

function renderMap(){
    
}

//on click event listener to generate all sandwich shops in the area + reviews + hours and 'traffic': use font awesome icon
function  renderSandwichShops(){
    
}
//on click event listener to generate all sandwich shops in the area + reviews + hours and 'traffic': use font awesome icon
function renderCoffeeShops(){

}
//on click event listener to generate all sandwich shops in the area + reviews + hours and 'traffic' : use font awesome icon
function renderSushi(){

}
}