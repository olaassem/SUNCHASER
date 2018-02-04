//* * * * *      C O D E      O R D E R        * * * * * 
// 1.constants
// 2. sunset sunrise
// 3. hiking trails
// 4. weather
// 5. google maps
// 6. pictures




//     C O N S T A N T S   
let siteLatitude = 38.776991;  //will be dynamically set to clicked site lat
let siteLongitude = -77.263568;  //will be dynamically set to clicked site lat


 





//     S U N S E T      A N D       S U N R I S E       C O D E     //
/*
const SUNSETSUNRISE_ENDPOINT = 'https://api.sunrise-sunset.org/json';


function getSunriseSunsetAPIData(){
	let params ={
		lat: siteLatitude,
		lng: siteLongitude,
		date: "today"
	};
	$.getJSON(SUNSETSUNRISE_ENDPOINT, params, function( data ){
	}).done(function ( data ){
		console.log( data )
		displaySunsetSunrise(data.results)
	}).fail(function ( data ){
		alert('getSunriseSunsetAPIData function Ajax Call Failed!')
	});
}

getSunriseSunsetAPIData();


//Display Sunrise/Sunset Times
function displaySunsetSunrise( suntimes ){
	$('.js-sunrise-sunset').html(`
		<div class=js-sunrise-conatiner>	
			<img class="js-sunrise-img" src="https://png.icons8.com/metro/1600/sunrise.png" alt="sunrise icon"></img>
			<h3>Sunrise</h3>
			<h3 class="js-sunrise-time">${suntimes.sunrise}</h3>
		</div>	
		<div class=js-sunset-conatiner>	
			<img class="js-sunset-img" src="https://png.icons8.com/metro/1600/sunset.png" alt="sunset icon"></img>
			<h3>Sunset</h3>
			<h3 class="js-sunset-time">${suntimes.sunset}</h3>
		</div	
		`
	);
}

*/

//

//  W U N D E R G R O U N D   S U N S E T / S U N R I S E   &   C U R R E N T   T I M E    C O D E  //

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
		<div class=js-sunrise-conatiner>	
			<img class="js-sunrise-img" src="https://png.icons8.com/metro/1600/sunrise.png" alt="sunrise icon"></img>
			<h3>Sunrise</h3>
			<h3 class="js-sunrise-time">${suntimes.sun_phase.sunrise.hour}:${suntimes.sun_phase.sunrise.minute}</h3>
		</div>	
		<div class=js-sunset-conatiner>	
			<img class="js-sunset-img" src="https://png.icons8.com/metro/1600/sunset.png" alt="sunset icon"></img>
			<h3>Sunset</h3>
			<h3 class="js-sunset-time">${suntimes.sun_phase.sunset.hour}:${suntimes.sun_phase.sunset.minute}</h3>
		</div	
		`
	);
}
 


















//     H I K I N G       P R O J E C T       C O D E     //

const HIKINGPROJECT_ENDPOINT = 'https://www.hikingproject.com/data/get-trails?';
const HIKINGPROJECT_API_KEY = '200215433-db3c18acd15e272f8a8e4023dd642a8a';

function getHikingProjectData(){
	let params={
		lat: siteLatitude,
		lon: siteLongitude,
		maxDistance: 10,
		maxResults: 500,
		key: HIKINGPROJECT_API_KEY

	}
	$.getJSON(HIKINGPROJECT_ENDPOINT, params, function( data ){
	}).done( function( data ){
		console.log( data );
		//INSERT DISPLAY TRAILS FUNCTION
	}).fail( function ( data ){
		alert( "getHikingProjectData Ajax call failed");
	});
}

getHikingProjectData();


/*

// TRAIL DIFFICULTY FUNCTION
  green --  Easy: walking with no obstacles and low grades
  green/blue -- Easy/Intermediate
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




//     W E A T H E R B I T . I O       C O D E     //

const WEATHERBIT_HRLY_FORECAST_ENDPOINT = "https://api.weatherbit.io/v2.0/forecast/hourly";
const WEATHERBIT_FORECAST_ENDPOINT = "http://api.weatherbit.io/v1.0/forecast/daily";
const WEATHERBIT_CRNT_WTHR_ENDPOINT = "https://api.weatherbit.io/v2.0/current"
const WEATHERBIT_API_KEY = "62fe599ba6b44ae88a7e4e4319558f4c";



//Call to Weather Forecast API data
function getHourlyForecastData(){
	let params = {
		lat: siteLatitude,
		lon: siteLongitude,
		units: "I",
		hours: 12,
		key: WEATHERBIT_API_KEY
	}

	$.getJSON( WEATHERBIT_HRLY_FORECAST_ENDPOINT, params, function( forecast ){
		//success
	}).done( function ( forecast ){
		console.log( forecast.data );
		////INSERT DISPLAY TRAILS FUNCTION   displayHourlyForecast( forecast.data );
		//failure
	}).fail(function(){
		alert("getHourlyForecastData Ajax call failed!");
	});
}

getHourlyForecastData();

/*
//Display Weather Forecast Results
function displayHourlyForecast( forecast ){
	let forecastOutput = forecast.map(item => 
		renderWeatherForecast(item)).join('');
        $('#js-forecast-container').html(forecastOutput);
}

//Render Weather Forecast Results to the DOM
function renderWeatherForecast ( item ){
	return `
		<div class="col-3">
    		<div class="js-daily-forecast">
            	<h3 class="js-forecast-date">${item.datetime}</h3>
            	<img class="js-weather-icon" src="https://weatherbit.io/static/img/icons/${item.weather.icon}.png" alt="${item.weather.description}"></img>
			    <p class="js-forecast-description">${item.weather.description}</p>
			    <p class="js-forecast-hightemp">H ${item.max_temp.toFixed()} &#176;F</p>
			    <p class="js-forecast-lowtemp">L ${item.min_temp.toFixed()} &#176;F</p>
			    <p class="js-forecast-humidity">Humidity ${item.rh.toFixed()}&#37;</p>
			    <p class="js-forecast-percipitation">Chance of Percipitation ${item.pop.toFixed()}%</p>
			</div>    
        </div>

	  `
}
























//Call to Weather Forecast API data
function getWeatherBitData(){
	let params = {
		lat: siteLatitude,
		lon: siteLongitude,
		units: "I",
		days: 5,
		key: WEATHERBIT_API_KEY
	}

	$.getJSON( WEATHERBIT_FORECAST_ENDPOINT, params, function( forecast ){
		//success
	}).done( function ( forecast ){
		console.log( forecast.data );
		displayForecast( forecast.data );
		//failure
	}).fail(function(){
		alert("Weatherbit Forecast Ajax call failed!");
	});
}

getWeatherBitData();


//Display Weather Forecast Results
function displayForecast( forecast ){
	let forecastOutput = forecast.map(item => 
		renderWeatherForecast(item)).join('');
        $('#js-forecast-container').html(forecastOutput);
}

//Render Weather Forecast Results to the DOM
function renderWeatherForecast ( item ){
	return `
		<div class="col-3">
    		<div class="js-daily-forecast">
            	<h3 class="js-forecast-date">${item.datetime}</h3>
            	<img class="js-weather-icon" src="https://weatherbit.io/static/img/icons/${item.weather.icon}.png" alt="${item.weather.description}"></img>
			    <p class="js-forecast-description">${item.weather.description}</p>
			    <p class="js-forecast-hightemp">H ${item.max_temp.toFixed()} &#176;F</p>
			    <p class="js-forecast-lowtemp">L ${item.min_temp.toFixed()} &#176;F</p>
			    <p class="js-forecast-humidity">Humidity ${item.rh.toFixed()}&#37;</p>
			    <p class="js-forecast-percipitation">Chance of Percipitation ${item.pop.toFixed()}%</p>
			</div>    
        </div>

	  `
}


//Call to Current Weather API data
function getCurrentWeatherData(){
	let params = {
		lat: siteLatitude,
		lon: siteLongitude,
		units: "I",
		key: WEATHERBIT_API_KEY
	}
	$.getJSON( WEATHERBIT_CRNT_WTHR_ENDPOINT, params, function( crntweather ){
		//success
	}).done( function ( crntweather ){
		console.log( crntweather.data );
		displayCurrentWeather( crntweather.data[0] );
		//i want the first current weather object in the array called data
		
		//failure
	}).fail(function(){
		alert("Weatherbit Current Weather Ajax call failed!");
	});
}
getCurrentWeatherData();
	

function displayCurrentWeather( crntweather ){
	$('#js-current-weather-container').html(`

			<div class="col-3">
	    		<div class="js-current-weather">

	            	<h3 class="js-crntweather-title">Current Weather</h3>
					<img class="js-weather-icon" src="https://weatherbit.io/static/img/icons/${crntweather.weather.icon}.png" alt="${crntweather.weather.description}"></img>
					<p class="js-crntweather-description">${crntweather.weather.description}</p>
					<p class="js-crntweather-temp">${crntweather.temp} &#176;F</p>
					<p class="js-forecast-humidity">Humidity ${crntweather.rh.toFixed()}&#37;</p>
				</div>    
            </div>
	  `);
}



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
//-------------------------------------------------------------





