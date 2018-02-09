//C O D E    O R D E R//
// . google places api
// . wunderground api: sunset/sunrise | current time | 12 hr forecast.
// . hiking trails api
// . Commented out/Might use: Google Maps API 


//G O O G L E    P L A C E S    C O D E//     

function initialize() {
   //initMap();
   initAutocomplete();
}


let placeSearch;
let autocomplete; 
let geocoder;

function initAutocomplete(){
	//Access the Google Maps API geocoding service
	geocoder = new google.maps.Geocoder();
	autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
    	types: ['geocode']
    });

    autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address){
	//The Geocoder.geocode() method initiates a request to 
	//the geocoding service, passing it a GeocoderRequest object 
	//literal containing the input terms and a callback method 
	//to execute upon receipt of the response.
	geocoder.geocode({
	//supply he GeocoderRequest object literal the "address"
	//parameter which we want to geocode.
		'address': address
	//The Geocoding service requires a callback method to execute 
	//upon retrieval of the geocoder's results. This callback should 
	//pass two parameters to hold the results and a status code, 
	//in that order.	
	}, function( results, status ){
		if (status === 'OK') {
	// This is the lat and lng results[0].geometry.location
	//The GeocoderResult object represents a single geocoding result.
	//"geometry" contains the following information:
	//"location" contains the geocoded latitude,longitude value. 
	//Note that we return this location as a LatLng object, not as a formatted string.
			//console.log( results[0].geometry.location );

	//Create new queryLatitude variable and assign latitude result to it 
			let queryLatitude = results[0].geometry.location.lat();
			//console.log(queryLatitude);
	//Create new queryLongitude variable and assign longitude result to it 
			let queryLongitude = results[0].geometry.location.lng();
			//console.log(queryLongitude);
	//Call api functions here and pass lat and lng parameters through them
			getSunriseSunsetAPIData( queryLatitude, queryLongitude );
      		getHourlyAPIData( queryLatitude, queryLongitude );
      		getHikingProjectData( queryLatitude, queryLongitude );
      		//initMap( queryLatitude, queryLongitude );

    	} else {
    		alert('Geocode was not successful for the following reason: ' + status);
    	}
  	});
}

function fillInAddress(){
	let place = autocomplete.getPlace();
	codeAddress(document.getElementById('autocomplete').value);
}


//WUNDERGROUND API:  SUNSET/SUNRISE | CURRENT TIME | 12 HOUR FORECAST CODE//

const SUNSETSUNRISE_ENDPOINT = 'http://api.wunderground.com/api/';
const SUNSETSUNRISE_API_KEY = '4259db9143b819d5';

function getSunriseSunsetAPIData( lat, lng ){
	$.getJSON( ("http://api.wunderground.com/api/4259db9143b819d5/astronomy/q/"+lat+","+lng+".json"), function( data ){
	}).done(function ( data ){
		//console.log( data )
		displayTimeSunsetSunrise( data );
	}).fail(function ( data ){
		alert('getSunriseSunsetAPIData function Ajax Call Failed!')
	});
}


//Display Current Time & Sunrise/Sunset Times
function displayTimeSunsetSunrise( suntimes ){
	$('.js-time-sunrise-sunset').html(`
		<div class="js-current-time-container col-4 parallaxtime">
			<h3 class="js-current-time-text">${suntimes.moon_phase.current_time.hour}:${suntimes.moon_phase.current_time.minute}</h3>
			<h3 class="suntimestext">Current Time</h3>
		</div>
		<div class="js-sunrise-conatiner col-4 parallaxsunrise">	
			<h3 class="js-sunrise-time">${suntimes.sun_phase.sunrise.hour}:${suntimes.sun_phase.sunrise.minute}</h3>
			<h3 class="suntimestext">Sunrise</h3>
		</div>	
		<div class="js-sunset-conatiner col-4 parallaxsunset">	
			<h3 class="js-sunset-time">${suntimes.sun_phase.sunset.hour}:${suntimes.sun_phase.sunset.minute}</h3>
			<h3 class="suntimestext">Sunset</h3>
		</div	
		`
	);
}


 
//Get Hourly Forecast Data
function getHourlyAPIData( lat, lng ){
	$.getJSON( ("http://api.wunderground.com/api/4259db9143b819d5/hourly/q/"+lat+","+lng+".json"), function( data ){
	}).done(function ( data ){
		//console.log( data )
		displayHourlyForecast( data);
	}).fail(function ( data ){
		alert('getHourlyAPIData function Ajax Call Failed!')
	});
}

//Display Hourly Forecast 
function displayHourlyForecast( forecast ){
	for(let i = 0; i < 12; i++){
   		$('.js-12hourforecast').append(`
   			<tr class=".js-forecast-results-rows">				
				<td>${forecast.hourly_forecast[i].FCTTIME.hour}:${forecast.hourly_forecast[i].FCTTIME.min}</td>
				<td>${forecast.hourly_forecast[i].FCTTIME.weekday_name_abbrev}</td>
				<td><img class="js-forecast-icon" src=${forecast.hourly_forecast[i].icon_url} alt="${forecast.hourly_forecast[i].icon}"></img></td>
				<td>${forecast.hourly_forecast[i].condition}</td>
				<td>${forecast.hourly_forecast[i].temp.english}&#176;F</td>
				<td>${forecast.hourly_forecast[i].temp.english}%</td>
				<td>${forecast.hourly_forecast[i].humidity}%</td>
				<td>${forecast.hourly_forecast[i].wdir.dir} ${forecast.hourly_forecast[i].wspd.english} mph</td>	
			</tr>
		`)
	}
}



//H I K I N G       P R O J E C T       C O D E//

const HIKINGPROJECT_ENDPOINT = 'https://www.hikingproject.com/data/get-trails?';
const HIKINGPROJECT_API_KEY = '200215433-db3c18acd15e272f8a8e4023dd642a8a';

function getHikingProjectData( lat, lng ){
	let params={
		lat: lat,
		lon: lng,
		maxDistance: 5,
		maxResults: 500,
		key: HIKINGPROJECT_API_KEY
	}
	$.getJSON(HIKINGPROJECT_ENDPOINT, params, function( data ){
	}).done( function( data ){
		//console.log( data );
		displayAllTrails( data.trails );
		//console.log(data.trails);
	}).fail( function ( data ){
		alert( "getHikingProjectData Ajax call failed");
	});
}



//Display Trail Info
function displayAllTrails( trails ){
	$(".js-trails-container").empty();
	trails.forEach((trail, index) => { //loop iterator
		const trailDifficultyLevel = displayTrailDifficulty( trail.difficulty );
		const fillerTrailImg = fillMissingTrailImg( trail.imgMedium );
		$(".js-trails-container").append(`
			

			<div class="row">

				<div class="col-4">
					<div class="js-trail">
						<a href=${trail.url} target="_blank">
							<h3 class="js-trailname">${trail.name}</h3>
						</a>
						<p class="js-traillocation">${trail.location}</p>
						<div class="crop"
							<a href=${trail.url} target="_blank">
								<img class="js-trailimg" src=${fillerTrailImg} alt="image of trail"></img>
							</a>
						</div>	
						<h3 class="js-traillength">${trail.length} miles</h3>
						<p class="js-traildifficulty">${trailDifficultyLevel}</p>
						<p class="js-trailascentdescent">${trail.ascent}' Ascent     ${trail.descent}' Descent</p>
						<p class="js-trailsummary">${trail.summary}</p>
					</div>
				</div>

				<div id="map${index}" class="map col-6"></div>
			</div>
		`);
		const trailMap = initMap( trail.latitude, trail.longitude, index );
	});
}

//

//Replace trail difficulty color value with description text
function displayTrailDifficulty( traildifflevel ){
  // TODO: use switch statement (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
  //switch (traildifflevel) {
  //  case 'green':
  //    return "Easy: walking with no obstacles and low grades";
  //    
  //  case 'greenBlue':
  //    return "Easy/Intermediate";
  //}
  
	if( traildifflevel === "green" ){
		return "Easy: walking with no obstacles and low grades";
	}if( traildifflevel === "greenBlue" ){
		return "Easy/Intermediate";
	}if( traildifflevel === "blue" ){
		return "Intermediate: 10% grade, small rocks and roots, easy scrambling";
	}if( traildifflevel === "blueBlack" ){
		return "Intermediate/Difficult";
	}if( traildifflevel === "black" ){
		return "Difficult: 15% grade, large obstacles, possible scrambling or climbing";
	}if( traildifflevel === "blackBack" ){
		return'Extremely Difficult: 20% grade, 15+" obstacles, many harder sections';
	}if( traildifflevel === "" ){
		return"No rating available";
	};
}

//Replace empty trail images with a filler image
function fillMissingTrailImg( trailImg ){
	if(trailImg === ""){
		return "https://upload.wikimedia.org/wikipedia/commons/2/22/Maudslay_running_trail_1.JPG";
	} else {
		return trailImg;
	}
}


//G O O G L E    M A P S    C O D E//

//  Google Maps Marker Icons
//const GOOGLE_MAPS_ENDPNT = 'https://maps.googleapis.com/maps/api/js';
//const GOOGLE_MAPS_API_KEY = 'AIzaSyA6ECb06GHjgfRQjrOJKy6tQqScBimbFmA';


function initMap( lat, lng, index ){
	// set a new variable called map and set it to a new google.map object
	// since we already set the google maps script in index.html
	// we can say new google.maps --> do different things
	// we use .Map to get the map
	let location ={
		lat: parseFloat(lat),
		lng: parseFloat(lng)
	};
	
	//New map
	let map = new google.maps.Map(document.getElementById('map' + index),{
		zoom: 15,
		center: location
	});
	//Location marker
	let marker = new google.maps.Marker({
		position: location,
		map: map,
		animation: google.maps.Animation.DROP
	});
}






//Scroll-to-top button function
// 1. lets first listen for the scroll event
$(window).scroll(function(){

    // top value in this case 0
    let wScroll = $(this).scrollTop();
  
    // determine when to show button
    let showScrollButton = 200;

    // fadein / fadeout back to  top button
    if (wScroll > showScrollButton) {
        $('#scroll-to-top').fadeIn();
    } else {
        $('#scroll-to-top').fadeOut();
    }
});


//Scroll-to-top on-click function
$('#scroll-to-top').click(function () {
    $('body,html').animate({

      //scroll to top of window position
      scrollTop: 0
    }, 2000);

    // stop anchor link behavior
    return false;
});




