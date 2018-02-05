//* * * * *      C O D E      O R D E R        * * * * * 
// 1. constants
// 2. wunderground api: sunset/sunrise | current time | 12 hr forecast.
// 3. ???current weather???
// 4. hiking trails
// 5. google maps
// 6. 




//     C O N S T A N T S   
let siteLatitude = 38.776991;  //will be dynamically set to clicked site lat
let siteLongitude = -77.263568;  //will be dynamically set to clicked site lat


 /*

//  WUNDERGROUND API:  SUNSET/SUNRISE | CURRENT TIME | 12 HOUR FORECAST CODE  //

const SUNSETSUNRISE_ENDPOINT = 'http://api.wunderground.com/api/';
const SUNSETSUNRISE_API_KEY = '4259db9143b819d5';

function getSunriseSunsetAPIData(){
	$.getJSON( ("http://api.wunderground.com/api/4259db9143b819d5/astronomy/q/"+siteLatitude+","+siteLongitude+".json"), function( data ){
	}).done(function ( data ){
		console.log( data )
		displaySunsetSunrise( data );
		displayCurrentTime( data );
	}).fail(function ( data ){
		alert('getSunriseSunsetAPIData function Ajax Call Failed!')
	});
}

getSunriseSunsetAPIData();


//Display Current Time
function displayCurrentTime( timenow ){
	$('.js-current-time').html(`
			<h3 class="js-current-time-text">${timenow.moon_phase.current_time.hour}:${timenow.moon_phase.current_time.minute}</h3>

		`
	);
}


//Display Sunrise/Sunset Times
function displaySunsetSunrise( suntimes ){
	$('.js-sunrise-sunset').html(`
		<div class="js-sunrise-conatiner col-6">	
			<img class="js-sunrise-img" src="https://png.icons8.com/metro/1600/sunrise.png" alt="sunrise icon"></img>
			<h3>Sunrise</h3>
			<h3 class="js-sunrise-time">${suntimes.sun_phase.sunrise.hour}:${suntimes.sun_phase.sunrise.minute}</h3>
		</div>	
		<div class="js-sunset-conatiner col-6">	
			<img class="js-sunset-img" src="https://png.icons8.com/metro/1600/sunset.png" alt="sunset icon"></img>
			<h3>Sunset</h3>
			<h3 class="js-sunset-time">${suntimes.sun_phase.sunset.hour}:${suntimes.sun_phase.sunset.minute}</h3>
		</div	
		`
	);
}
 

//Get Hourly Forecast Data
function getHourlyAPIData(){
	$.getJSON( ("http://api.wunderground.com/api/4259db9143b819d5/hourly/q/"+siteLatitude+","+siteLongitude+".json"), function( data ){
	}).done(function ( data ){
		console.log( data )
		displayHourlyForecast( data);
	}).fail(function ( data ){
		alert('getHourlyAPIData function Ajax Call Failed!')
	});
}

getHourlyAPIData();


//Display Hourly Forecast 
function displayHourlyForecast( forecast ){
	for(let i = 0; i < 12; i++){
   		$('.js-forecast-container').append(`

 		<div class="js-12hourforecast">
			<p class="js-hourly-hour">${forecast.hourly_forecast[i].FCTTIME.hour}:${forecast.hourly_forecast[i].FCTTIME.min}</p>
			<p class="js-weekday">${forecast.hourly_forecast[i].FCTTIME.weekday_name_abbrev}</p>
			<img class="js-forecast-icon" src=${forecast.hourly_forecast[i].icon_url} alt="${forecast.hourly_forecast[i].icon}"></img>
			<p class="js-forecast-condition">${forecast.hourly_forecast[i].condition}</p>
			<p class="js-hourly-temp">${forecast.hourly_forecast[i].temp.english}&#176;F</p>
			<p class="js-hourly-precip">PRECIP ${forecast.hourly_forecast[i].temp.english}%</p>
			<p class="js-hourly-humidity">HUMIDITY ${forecast.hourly_forecast[i].humidity}%</p>
			<p class="js-hourly-wind">WIND ${forecast.hourly_forecast[i].wdir.dir} ${forecast.hourly_forecast[i].wspd.english} mph</p>
		</div>
		`)
	}
}





//     H I K I N G       P R O J E C T       C O D E     //

const HIKINGPROJECT_ENDPOINT = 'https://www.hikingproject.com/data/get-trails?';
const HIKINGPROJECT_API_KEY = '200215433-db3c18acd15e272f8a8e4023dd642a8a';

function getHikingProjectData(){
	let params={
		lat: siteLatitude,
		lon: siteLongitude,
		maxDistance: 5,
		maxResults: 500,
		key: HIKINGPROJECT_API_KEY

	}
	$.getJSON(HIKINGPROJECT_ENDPOINT, params, function( data ){
	}).done( function( data ){
		console.log( data );
		displayAllTrails( data.trails );
	}).fail( function ( data ){
		alert( "getHikingProjectData Ajax call failed");
	});
}

getHikingProjectData();


//Display Trails
function displayAllTrails( trails ){
	trails.forEach(trail => { //loop iterator
		$(".js-trails-container").append(`
			<div class="js-trail">
				<h3 class="js-trailname">${trail.name}</h3>
				<p class="js-traillocation">${trail.location}</p>
				<a href=${trail.url} target="_blank">
					<img class="js-trailimg" src=${trail.imgSqSmall} alt="image of trail"></img>
				</a>
				<h3 class="js-traillength">${trail.length} miles</h3>
				<p class="js-traildifficulty">Difficulty ${trail.difficulty}</p>
				<p class="js-trailascentdescent">${trail.ascent}' Ascent     ${trail.descent}' Descent</p>
				<p class="js-trailsummary">${trail.summary}</p>
			</div>
			`);
	});
}

//in .forEach(), we are dealing with each single element of the array at a time. 
//(in this case, each single element of the array(item) is an object --> "trail" ).




// TRAIL DIFFICULTY FUNCTION
/*
  green --  Easy: walking with no obstacles and low grades
  greenBlue -- Easy/Intermediate
  blue -- Intermediate: 10% grade, small rocks and roots, easy scrambling
  blue black -- Intermediate/Difficult
  black -- Difficult: 15% grade, large obstacles, possible scrambling or climbing
  black black -- Extremely Difficult: 20% grade, 15+" obstacles, many harder sections
*/






/*
//     G O O G L E       M A P S       C O D E     //


//  Google Maps Marker Icons
//const UWH_ICON1 = 'https://upload.wikimedia.org/wikipedia/it/9/91/UNESCO_World_Heritage_Site_logo.svg';
//const UWH_ICON1 = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/World_Heritage_Logo_global.svg';

//  Google Maps Marker Icons
//const GOOGLE_MAPS_ENDPNT = 'https://maps.googleapis.com/maps/api/js';
//const GOOGLE_MAPS_API_KEY = 'AIzaSyA6ECb06GHjgfRQjrOJKy6tQqScBimbFmA';

function initMap(){
	// inside function:
	// set a new variable called map and set it to a new google.map object
	// since we already set the google maps script in index.html
	// we can say new google.maps --> do different things
	// we use .Map to get the map
	// that's going to take in 2 parameters
	// 1. the element we are dumping the element in : id map
	// 2. some map options 
	// let's put our options inside a variable
	let options = {
		zoom: 12,
		center: {
			lat: siteLatitude,
			lng: siteLongitude
		},
	};
	//New Map
	let map = new google.maps.Map(document.getElementById( 'map' ), options );

	//Transit Layer
	let transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap( map );

	//Add UWH Site Marker
	let uwhSiteMarker = new google.maps.Marker({
		position: options.center,
		map: map,
		//drop down marker animation from top of map
		animation: google.maps.Animation.DROP
		//add custom marker icon
		//icon: UWH_ICON
	});
}


/*
         featureType: transit
transit.station selects all transit stations.
transit.station.airport selects airports.
transit.station.bus selects bus stops.
transit.station.rail selects rail stations.
*/







/*
//     F L I C K R       C O D E     //


const FLICKR_ENDPOINT = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
const FLICKR_API_KEY = 'aeb542f2e60fb88d6be6dfed6fec35d1';
const FLICKR_SECRET_API_KEY = 'fc367410d2dfeb24';


//This method requires authentication with 'write' permission.
//--> may mean have an api key
//-->


//https://api.flickr.com/services/feeds/photos_public.gne


function getFlickrApiData(){
	let params={
		method: "flickr.photos.geo.getLocation",
		//method is a parameter
		lat: siteLatitude,
		lon: siteLongitude,
		format: "json",
		api_key:FLICKR_API_KEY
	};
	$.getJSON(FLICKR_ENDPOINT,params, function(    ){
	}).done( function( data ){
		console.log(data);
	}).fail( function( data ){
		alert("Flickr Ajax Call Failed")
	});
} 

getFlickrApiData();
*/

///////////////////////////////////////////////////////////////////////////////////




function userSubmitData() {
	$('.js-search-form').on('click', '.js-submit-button', function(event) {
	event.preventDefault();
	let queryValue = $('#query').val();
	})
}

userSubmitData();



let placeSearch;
let autocomplete; 
let geocoder;

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
      types: ['geocode']
    });

  autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address) {
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      // This is the lat and lng results[0].geometry.location
      alert(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function fillInAddress() {
  var place = autocomplete.getPlace();

  codeAddress(document.getElementById('autocomplete').value);
}
