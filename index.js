//API ENDPOINTS
const GEOCODE_SEARCH_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const FOURSQUARE_SEARCH_URL = 'https://api.foursquare.com/v2/venues/search'
const FOURSQUARE_TIPS_URL = 'https://api.foursquare.com/v2/venues/VENUE_ID/tips' // VENUE_ID is a variable... how do I insert it through JSON before? other than uniquely build each endpoint address?

//Global Variables Here
let searchLocationGeo = "";
let locationGeo="";
let locationGeoLat ="";
let locationGeoLng = "";
let venueUniqueId = "";

//need to catch if it isn't a valid address or city name
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
     locationGeoLat = data.results[0].geometry.location.lat;
     locationGeoLng = data.results[0].geometry.location.lng;
     $('#js-search-results').empty();
}

//EVENT LISTEN - Coffee, Sushi and Sandwiches
function handleCoffeeClick(){
    $('#buttonCoffee').click(event =>{
        event.preventDefault();
      const fourSquareCoffeeQuery = {
    ll: `${locationGeoLat}, ${locationGeoLng}`,
    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
    client_secret: 'IYLWYATBULKOL1KDBPNXX5FVSZ3CLHFLPZLPQDQCH1QGA3VR',
    radius: 3218.69,
    query: 'coffee',
    v: '20180423',
}
$.getJSON(FOURSQUARE_SEARCH_URL,fourSquareCoffeeQuery, renderFourSquareData)
});
}

function handleSandwichClick(){
    $('#buttonSandwich').click(event =>{
        event.preventDefault();
       const fourSquareSandwichQuery = {
    ll: `${locationGeoLat}, ${locationGeoLng}`,
    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
    client_secret: 'IYLWYATBULKOL1KDBPNXX5FVSZ3CLHFLPZLPQDQCH1QGA3VR',
    radius: 3218.69,
    query: 'sandwich',
    v: '20180423',
}
$.getJSON(FOURSQUARE_SEARCH_URL,fourSquareSandwichQuery, renderFourSquareData)
});
}

function handleSushiClick(){
    $('#buttonSushi').click(event =>{
        event.preventDefault();
       const fourSquareSushiQuery = {
    ll: `${locationGeoLat}, ${locationGeoLng}`,
    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
    client_secret: 'IYLWYATBULKOL1KDBPNXX5FVSZ3CLHFLPZLPQDQCH1QGA3VR',
    radius: 3218.69,
    query: 'sushi',
    v: '20180423',
}
$.getJSON(FOURSQUARE_SEARCH_URL,fourSquareSushiQuery, renderFourSquareData)
});
}

function generateFourSquareResults(venueResults){
    venueUniqueId = venueResults.id;
    console.log(venueUniqueId);
    retrieveFourSquareTipsData();
    //call the 2nd ajax request here
    return `
        <div>
        <h2> ${venueResults.name}</h2>
            <div> Distance: ${venueResults.location.distance} meters away</div>   
            <div> ${venueResults.location.formattedAddress} </div>
            <div id = ${venueResults.id}></div>`;
            //.append into this section to generate appropriate tips, reviews etc.
}

function renderFourSquareData(data){
    console.log(data);
    fourSquareResults = data.response.venues.map((venuesResults) => generateFourSquareResults(venuesResults)); 
    $('#js-search-results').html(fourSquareResults);
}

function retrieveFourSquareTipsData(venueUniqueId, callFourSquareTipsData){
    const fourSquareTipsSearch = {
        'id': `${venueUniqueId}`, // how do i pass in the array of venueIDs to grab a tip for every one?
        client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
        client_secret: 'IYLWYATBULKOL1KDBPNXX5FVSZ3CLHFLPZLPQDQCH1QGA3VR',
        sort: 'popular',
        limit: '1',
    }
    $.getJSON(FOURSQUARE_TIPS_URL, fourSquareTipsSearch, callFourSquareTipsData)
}

function callFourSquareTipsData(data){
    console.log(data);
}

//going to need to map your 2nd ajax request to append properly
//.append any additional results under here using your 2nd ajax request

//callback function can use venueId to grab tips and to properly append


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
    $('#buttonCoffee').prop('hidden',false);
    $('#buttonSandwich').prop('hidden', false);
    $('#buttonSushi').prop('hidden',false);
    retrieveGoogleGeocodingData(searchLocationGeo, callGeoData);
});
}
   //if results are valid then show buttons 
    

// EVENT LISTENERS SECTION
function listenClick(){
    listenAddressSubmit();
    handleCoffeeClick();
    handleSandwichClick();
    handleSushiClick();
}   

$(listenClick);
