//API ENDPOINTS
const GEOCODE_SEARCH_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const FOURSQUARE_URL = 'https://api.foursquare.com/v2/venues/'
const FOURSQUARE_TIPS_URL = 'https://api.foursquare.com/v2/venues/' // modify to construct endpoint address for search, tips and photos

//Global Variables Here
let searchLocationGeo = "";
let locationGeo="";
let locationGeoLat ="";
let locationGeoLng = "";

//autoComplete Functionality
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')),
    {types: ['geocode']});
}


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
    client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
    limit: 5, //temporary limit to reduce quota depletion
    radius: 3218.69,
    query: 'coffee',
    v: '20180425',
}
$.getJSON(`${FOURSQUARE_URL}search`,fourSquareCoffeeQuery, renderFourSquareSearchData)
});
}

function handleSandwichClick(){
    $('#buttonSandwich').click(event =>{
        event.preventDefault();
       const fourSquareSandwichQuery = {
    ll: `${locationGeoLat}, ${locationGeoLng}`,
    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
    client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
    limit: 5, //temporary limit to reduce quota depletion
    radius: 3218.69,
    query: 'sandwich',
    v: '20180425',
}
$.getJSON(`${FOURSQUARE_URL}/search`,fourSquareSandwichQuery, renderFourSquareSearchData)
});
}

function handleSushiClick(){
    $('#buttonSushi').click(event =>{
        event.preventDefault();
       const fourSquareSushiQuery = {
    ll: `${locationGeoLat}, ${locationGeoLng}`,
    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
    client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
    limit: 3, //temporary limit to reduce quota depletion
    radius: 3218.69,
    query: 'sushi',
    v: '20180425',
}
$.getJSON(`${FOURSQUARE_URL}/search`,fourSquareSushiQuery, renderFourSquareSearchData)
});
}


function generateFourSquareSearchResults(venueResults){
    venueUniqueId = venueResults.id;
    retrieveFourSquareTipsData(venueUniqueId);
    retrieveFourSquarePhotos(venueUniqueId);
    return `
        <div class ='js-venue-entry'> 
        <h3> ${venueResults.name}</h3>
            <div id = '${venueResults.id}'> </div>
            <div> <strong>Distance:</strong> ${venueResults.location.distance} meters away</div>   
            <div> ${venueResults.location.formattedAddress} </div>
            <br><br>
            <span> <strong>Tip:</strong> <div id = ${venueResults.id}2></div> </span>
            </div>`;

}

function renderFourSquareSearchData(data){
    fourSquareSearchResults = data.response.venues.map((venuesResults) => generateFourSquareSearchResults(venuesResults)); 
    $('#js-search-results').html(fourSquareSearchResults);
}

//TIPS AJAX Request
function retrieveFourSquareTipsData(venueUniqueId){
    const fourSquareTipsSearch = {
        client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
        client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
        sort: 'popular',
        limit: '1',
        v: '20180425',
    }
    const tipsSettings = {
        url:`${FOURSQUARE_URL}${venueUniqueId}/tips`,
        data: fourSquareTipsSearch,
        dataType: 'json',
        type: 'GET',
        success: function(data){
                renderFourSquareTipsData(data, venueUniqueId)
            }
         }
     $.ajax(tipsSettings)
}


function renderFourSquareTipsData(data, venueId){
        console.log(data);
         //in event there are no Tips, display "No Tips Available" 
         if (data.response.tips.count === 0){
            let noTips = `<div class = 'tip'>No Tips  Available</div> 
                         <div> <strong>FourSquare:</strong>  No Link Available </div>`;
            $(`#${venueId}2`).html(noTips);
         }
         else{
            fourSquareTips = data.response.tips.items.map((tipResults) => generateFourSquareTipResults(tipResults));
            $(`#${venueId}2`).html(fourSquareTips);
         }
     }
     

function generateFourSquareTipResults(tipResults){
        return `<div class = 'tip'>${tipResults.text}</div> 
                <span> FourSquare: <a href ='${tipResults.canonicalUrl}'>Link</a></span>`
            
}
//PHOTO AJAX REQUEST
function retrieveFourSquarePhotos(venueUniqueId){
    const fourSquarePhotoSearch = {
        client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
        client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
        limit: 1,
        v: '20180425',
    }
    const photoSettings = {
        url: `${FOURSQUARE_URL}${venueUniqueId}/photos`,
        data: fourSquarePhotoSearch,
        dataType: 'json',
        type: 'GET',
        success: function(data){
            renderFourSquarePhotoData(data, venueUniqueId)
        }
    }
    $.ajax(photoSettings);
}

function renderFourSquarePhotoData(data, venueId){
    console.log(data);
    console.log(data.response.photos.items.length);
    //in event there are no photos, display "No Image available" 
    if (data.response.photos.items.length === 0) {
        let noImage = `<img class = 'venuePhoto' src = 'http://chittagongit.com//images/no-image-available-icon/no-image-available-icon-7.jpg' alt = 'No image available'></div>`;
        $(`#${venueId}`).html(noImage);
    }

    else{
      let  fourSquarePhotos = data.response.photos.items.map((photoResults) => generateFourSquarePhotoResults(photoResults));
     // if (data.response.photos.items)
      $(`#${venueId}`).html(fourSquarePhotos);
    }
}

function generateFourSquarePhotoResults(photoResults){
            return `<img class = 'venuePhoto' src = '${photoResults.prefix}125x225${photoResults.suffix}' alt = '${photoResults.source.name}'></div>`
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
    //make visible search buttons after user entry
    $('#buttonCoffee').prop('hidden',false);
    $('#buttonSandwich').prop('hidden', false);
    $('#buttonSushi').prop('hidden',false);
    retrieveGoogleGeocodingData(searchLocationGeo, callGeoData);
});
}
    

// EVENT LISTENERS SECTION
function listenClick(){
    listenAddressSubmit();
    handleCoffeeClick();
    handleSandwichClick();
    handleSushiClick();
}   

$(listenClick);
