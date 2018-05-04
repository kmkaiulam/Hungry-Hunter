//API ENDPOINTS
const GEOCODE_SEARCH_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const FOURSQUARE_URL = 'https://api.foursquare.com/v2/venues/' // modify to construct endpoint address for explore, tips and photos


//Global Variables Here
let searchLocationGeo = "";
let locationGeo="";
let locationGeoLat ="";
let locationGeoLng = "";
let offsetToken = 0;
let foodQuery = "";
let newExploreArray = [];
let totalResults = 0;

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
   locationGeo = data.results[0].geometry.location
     locationGeoLat = data.results[0].geometry.location.lat;
     locationGeoLng = data.results[0].geometry.location.lng;
     $('#js-search-results').empty();

}

//Next and Back Buttons
function handleNextButtonClick(){
    $('#nextButton').click(event => {
        $('#backButton').prop('hidden',false);
        event.preventDefault();
        offsetToken +=5;
        if (totalResults - offsetToken < 5){
            $('#nextButton').prop('hidden', true);
        } 
        switch(foodQuery){
            case 'coffee':  
               const fourSquareCoffeeQuery = {
                    ll: `${locationGeoLat}, ${locationGeoLng}`,
                    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
                    client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
                    limit: 5, //temporary limit to reduce quota depletion
                    offset: offsetToken,
                    radius: 3218.69,
                    query: foodQuery,
                    v: '20180425',
                }
                $.getJSON(`${FOURSQUARE_URL}explore`,fourSquareCoffeeQuery, renderFourSquareSearchData)
                break;
            case 'sandwich':
                const fourSquareSandwichQuery = {
                    ll: `${locationGeoLat}, ${locationGeoLng}`,
                    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
                    client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
                    limit: 5, //temporary limit to reduce quota depletion
                    offset: offsetToken,
                    radius: 3218.69,
                    query: foodQuery,
                    v: '20180425',
                }
                $.getJSON(`${FOURSQUARE_URL}/search`,fourSquareSandwichQuery, renderFourSquareSearchData)
                break;
            case 'sushi':
                const fourSquareSushiQuery = {
                    ll: `${locationGeoLat}, ${locationGeoLng}`,
                    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
                    client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
                    limit: 5, //temporary limit to reduce quota depletion
                    offset: offsetToken,
                    radius: 3218.69,
                    query: foodQuery,
                    v: '20180425',
                }
                $.getJSON(`${FOURSQUARE_URL}explore`,fourSquareSushiQuery, renderFourSquareSearchData)
                break;
            }
    });
}

function handleBackButtonClick(){
    $('#backButton').click(event => {
        event.preventDefault();
        if (offsetToken > 0){
            offsetToken = offsetToken - 5;
            }
        if (offsetToken === 0) {
            $('#backButton').prop('hidden', true);
        }
        if (totalResults - offsetToken > 5){
            $('#nextButton').prop('hidden', false);
        } 
        switch(foodQuery){
            case 'coffee':  
               const fourSquareCoffeeQuery = {
                    ll: `${locationGeoLat}, ${locationGeoLng}`,
                    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
                    client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
                    limit: 5, //temporary limit to reduce quota depletion
                    offset: offsetToken,
                    radius: 3218.69,
                    query: foodQuery,
                    v: '20180425',
                }
                $.getJSON(`${FOURSQUARE_URL}explore`,fourSquareCoffeeQuery, renderFourSquareSearchData)
                break;
            case 'sandwich':
                const fourSquareSandwichQuery = {
                    ll: `${locationGeoLat}, ${locationGeoLng}`,
                    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
                    client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
                    limit: 5, //temporary limit to reduce quota depletion
                    offset: offsetToken,
                    radius: 3218.69,
                    query: foodQuery,
                    v: '20180425',
                }
                $.getJSON(`${FOURSQUARE_URL}/search`,fourSquareSandwichQuery, renderFourSquareSearchData)
                break;
            case 'sushi':
                const fourSquareSushiQuery = {
                    ll: `${locationGeoLat}, ${locationGeoLng}`,
                    client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
                    client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
                    limit: 5, //temporary limit to reduce quota depletion
                    offset: offsetToken,
                    radius: 3218.69,
                    query: foodQuery,
                    v: '20180425',
                }
                $.getJSON(`${FOURSQUARE_URL}explore`,fourSquareSushiQuery, renderFourSquareSearchData)
                break;
            }
    });
}
function hideNavButtons(){
    totalResults = 0;
    $('#nextButton').prop('hidden', true);
    $('#backButton').prop('hidden', true);
}

//EVENT LISTEN - Coffee, Sushi and Sandwiches
function handleCoffeeClick(){
    $('#buttonCoffee').click(event =>{
        event.preventDefault();
        $('#nextButton').prop('hidden',false);
        offsetToken = 0;
        foodQuery = 'coffee';
        $('#js-search-results').empty();
        const fourSquareCoffeeQuery = {
            ll: `${locationGeoLat}, ${locationGeoLng}`,
            client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
            client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
            limit: 5, //temporary limit to reduce quota depletion
            offset: offsetToken,
            radius: 3218.69,
            query: foodQuery,
            v: '20180425',
        }
        $.getJSON(`${FOURSQUARE_URL}explore`,fourSquareCoffeeQuery, renderFourSquareSearchData)
    });
}

function handleSandwichClick(){
    $('#buttonSandwich').click(event =>{
        event.preventDefault();
        $('#nextButton').prop('hidden',false);
        offsetToken = 0;
        foodQuery = 'sandwich';
        $('#js-search-results').empty();
       const fourSquareSandwichQuery = {
            ll: `${locationGeoLat}, ${locationGeoLng}`,
            client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
            client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
            limit: 5, //temporary limit to reduce quota depletion
            offset: offsetToken,
            radius: 3218.69,
            query: foodQuery,
            v: '20180425',
        }
        $.getJSON(`${FOURSQUARE_URL}explore`,fourSquareSandwichQuery, renderFourSquareSearchData)
    });
}

function handleSushiClick(){
    $('#buttonSushi').click(event =>{
        event.preventDefault();
        $('#nextButton').prop('hidden',false);
        offsetToken = 0;
        foodQuery = 'sushi';
        $('#js-search-results').empty();
       const fourSquareSushiQuery = {
            ll: `${locationGeoLat}, ${locationGeoLng}`,
            client_id: 'AGSZCIMTJHOEQYLH3JA0MBUT0NDJOD2ACHB5CIFNAQMOIGOI',
            client_secret: 'EJG3ULU1EMP20VWXGKUDJCFZCUBUAGMF35ZESRNASEC3RZGA',
            limit: 5, //temporary limit to reduce quota depletion
            offset: offsetToken,
            radius: 3218.69,
            query: foodQuery,
            v: '20180425',
        }
        $.getJSON(`${FOURSQUARE_URL}explore`,fourSquareSushiQuery, renderFourSquareSearchData)
    });
}


function generateFourSquareSearchResults(venueResults){
    venueUniqueId = venueResults.id;
    retrieveFourSquareTipsData(venueUniqueId);
    retrieveFourSquarePhotos(venueUniqueId);
    return `
        <div class ='js-venue-entry'> 
            <h3 class = 'js-venue-title'> ${venueResults.name}</h3>
            <div class = 'js-photo-container' id = '${venueResults.id}photo'></div>
            <div class = 'js-venue-details'> 
                <div class = 'js-distance'><strong>Distance:</strong> ${venueResults.location.distance} meters away</div>
                <div class = 'js-address'> <strong>Address:</strong> ${venueResults.location.formattedAddress} </div>
                <div class = 'js-tip-link' ><strong>Tip:</strong><div class = 'js-tip-container' id = '${venueResults.id}tip'></div>
            </div>
            `
}

function renderFourSquareSearchData(data){
    $('.js-venue-entry').remove();
        totalResults = data.response.totalResults;
    let explore = data.response.groups[0].items;
//Allow for scalabilty if limit is changed
    for (let i=0; i <explore.length; i++) {
    newExploreArray.push(explore[i].venue);
}
   const fourSquareSearchResults = newExploreArray.map((venuesResults) => generateFourSquareSearchResults(venuesResults)); 
    $('#js-search-results').html(fourSquareSearchResults);
    newExploreArray = [];
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
         //in event there are no Tips, display "No Tips Available" 
         if (data.response.tips.count === 0){
            let noTips = `<div class = 'js-tips'>No Tips  Available</div> 
                          <br>
                         <div class = 'js-link'> <strong>FourSquare:</strong>  No Link Available </div>`;
            $(`#${venueId}tip`).html(noTips);
         }
         else{
            fourSquareTips = data.response.tips.items.map((tipResults) => generateFourSquareTipResults(tipResults));
            $(`#${venueId}tip`).html(fourSquareTips);
         }
     }
     

function generateFourSquareTipResults(tipResults){
        return `<div class ='js-tips'>${tipResults.text}</div> 
                <br>
                <div class ='js-link'> <strong>FourSquare:</strong> <a href ='${tipResults.canonicalUrl}'>Link</a></div>`
            
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
    //in event there are no photos, display "No Image available" 
    if (data.response.photos.items.length === 0) {
        let noImage = `<img class = 'js-venue-photo' src = 'http://chittagongit.com//images/no-image-available-icon/no-image-available-icon-7.jpg' alt = 'No image available'></div>`;
        $(`#${venueId}photo`).html(noImage);
    }

    else{
      let  fourSquarePhotos = data.response.photos.items.map((photoResults) => generateFourSquarePhotoResults(photoResults));
     // if (data.response.photos.items)
      $(`#${venueId}photo`).html(fourSquarePhotos);
    }
}

function generateFourSquarePhotoResults(photoResults){
            return `<img class = 'js-venue-photo' src = '${photoResults.prefix}300x400${photoResults.suffix}' alt = '${photoResults.source.name}'></div>`
        }         
    
    

function listenAddressSubmit(){
    $('.js-search-form').submit(event =>{
        event.preventDefault();
        hideNavButtons();
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
    handleNextButtonClick();
    handleBackButtonClick();
}   

$(listenClick);
