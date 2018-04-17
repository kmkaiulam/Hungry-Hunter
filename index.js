const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/output';

let oldQuery = "";

function retrieveGooglePlacesData(searchTerm, callback){
    const placesSearch = {
    query: `${searchTerm}`,
    key: 'AIzaSyA0Fr_D8DfctwBvp2kLFSmkPlcibgKRpKE',
    };
    $.getJSON(PLACES_SEARCH_URL, placesSearch, callback);
}

/
//Accept user input for city, state and convert to location coordinates using the geocoding API
function retrieveGoogleGeocodingData(){
console.log('This function accesses the ability to convert addresses to lat and longitude');
}

function convertCityToCoord(){
console.log('This function converts addresses to lat and longitude for use in search');
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

function listenSubmit(){
    $('.js-search-form').submit(event =>{
        event.preventDefault();
        console.log("button clicked");
        const queryTarget =$(event.currentTarget).find ('.js-query');
        const query = queryTarget.val();
        oldQuery = query;
        queryTarget.val("");
       // retrieveYoutubeData(query, displayYoutubeSearchData,"");
    $('#buttonCoffee').prop('hidden',false);
    $('#buttonSandwich').prop('hidden', false);
    $('#buttonSushi').prop('hidden',false);
});
}


$(listenSubmit);
