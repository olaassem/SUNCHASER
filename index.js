//C O D E    O R D E R//
// . google places api
// . wunderground api: sunset/sunrise | current time | 12 hr forecast.
// . hiking trails api
// . google maps api
// . ui functions


//G O O G L E    P L A C E S    C O D E//

function initialize() {
  initAutocomplete();
}

let placeSearch;
let autocomplete;
let geocoder;

//Access the Google Maps API geocoding service
function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
      types: ['geocode']
    });

  autocomplete.addListener('place_changed', fillInAddress);
}

//Get queried location lat and long and declare as variables
function codeAddress(address) {
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    //if valid query input
    if (status === 'OK') {
      $('#boxInvalid').hide();

      let queryLatitude = results[0].geometry.location.lat();
      let queryLongitude = results[0].geometry.location.lng();

      //Call api functions and pass lat and lng params through them
      getSunriseSunsetAPIData(queryLatitude, queryLongitude);
      getHourlyAPIData(queryLatitude, queryLongitude);
      getHikingProjectData(queryLatitude, queryLongitude);

      //if invalid query input
    } else {
      console.log(status);
      $('#boxInvalid').show();
      $('#box2').hide();
      $('#box3').hide();
    }
  });
}

function fillInAddress() {
  let place = autocomplete.getPlace();
  codeAddress(document.getElementById('autocomplete').value);
}


//WUNDERGROUND API:  SUNSET/SUNRISE | CURRENT TIME | 12 HOUR FORECAST CODE//

const SUNSETSUNRISE_ENDPOINT = 'https://api.wunderground.com/api/';
const SUNSETSUNRISE_API_KEY = '4259db9143b819d5';

function getSunriseSunsetAPIData(lat, lng) {
  $.getJSON(("https://api.wunderground.com/api/4259db9143b819d5/astronomy/q/" + lat + "," + lng + ".json"))
    .done(function(data) {
      //console.log( data )
      displayTimeSunsetSunrise(data);
      currentTimeImage(data);
    }).fail(function(data) {
      alert('getSunriseSunsetAPIData function Ajax Call Failed!')
    });
}


//Display Current Time & Sunrise/Sunset Times
function displayTimeSunsetSunrise(suntimes) {
  $('.js-time-sunrise-sunset').html(`
		<div class="col-4">
			<div class="js-current-time-container parallaxtime">
				<h3 class="js-current-time-text">${suntimes.moon_phase.current_time.hour}:${suntimes.moon_phase.current_time.minute}</h3>
				<h3 class="suntimestext">Current Time</h3>
			</div>
		</div>

		<div class="col-4">
			<div class="js-sunrise-conatiner parallaxsunrise">
				<h3 class="js-sunrise-time">${suntimes.sun_phase.sunrise.hour}:${suntimes.sun_phase.sunrise.minute}</h3>
				<h3 class="suntimestext">Sunrise</h3>
			</div>
		</div>

		<div class="col-4">
			<div class="js-sunset-conatiner parallaxsunset">
				<h3 class="js-sunset-time">${suntimes.sun_phase.sunset.hour}:${suntimes.sun_phase.sunset.minute}</h3>
				<h3 class="suntimestext">Sunset</h3>
			</div>
		</div>
	`);
}


//Dynamic Current Time Background Image
function currentTimeImage(currentTime) {
  switch (currentTime.moon_phase.current_time.hour) {
    //evening
    case '18':
    case '19':
    case '20':
    case '21':
      $('.parallaxtime').css('background-image', 'url(https://i.imgur.com/3zMRTlv.jpg)');
      break;
      //night
    case '22':
    case '23':
    case '24':
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
      $('.parallaxtime').css('background-image', 'url(https://i.imgur.com/EJfP3PA.jpg)');
      break;
      //morning
    case '7':
    case '8':
    case '9':
    case '10':
    case '11':
      $('.parallaxtime').css('background-image', 'url(https://i.imgur.com/CkiZkBv.jpg)');
      break;
      //afternoon
    case '12':
    case '13':
    case '14':
    case '15':
    case '16':
    case '17':
      $('.parallaxtime').css('background-image', 'url(http://www.wallpapers13.com/wp-content/uploads/2016/03/Lake-sun-rays-clear-lake-water-evaporation-from-the-green-forest-the-surrounding-mountains-sky-915x515.jpg)');
      break;
  }
}


//Get Hourly Forecast Data
function getHourlyAPIData(lat, lng) {
  $.getJSON(("https://api.wunderground.com/api/4259db9143b819d5/hourly/q/" + lat + "," + lng + ".json"))
    .done(function(data) {
      //console.log( data )
      displayHourlyForecast(data);
    }).fail(function(data) {
      alert('getHourlyAPIData function Ajax Call Failed!')
    });
}

//Display Hourly Forecast
function displayHourlyForecast(forecast) {
  $('.clearresults').html("");
  for (let i = 0; i < 12; i++) {
    $('.clearresults').append(`
   			<tr class=".js-forecast-results-rows">
				<td class="stack">${forecast.hourly_forecast[i].FCTTIME.hour}:${forecast.hourly_forecast[i].FCTTIME.min}</td>
				<td class="stack" style="color:grey">${forecast.hourly_forecast[i].FCTTIME.weekday_name_abbrev}</td>
				<td><img class="js-forecast-icon" src=${forecast.hourly_forecast[i].icon_url} alt="${forecast.hourly_forecast[i].icon}"></img></td>
				<td>${forecast.hourly_forecast[i].temp.english}&#176;F</td>
				<td>${forecast.hourly_forecast[i].temp.english}%</td>
				<td class="removemobile">${forecast.hourly_forecast[i].humidity}%</td>
				<td class="removemobile">${forecast.hourly_forecast[i].wdir.dir} ${forecast.hourly_forecast[i].wspd.english} mph</td>
			</tr>
		`)
  }
}


//H I K I N G       P R O J E C T       C O D E//

const HIKINGPROJECT_ENDPOINT = 'https://www.hikingproject.com/data/get-trails?';
const HIKINGPROJECT_API_KEY = '200215433-db3c18acd15e272f8a8e4023dd642a8a';

function getHikingProjectData(lat, lng) {
  let params = {
    lat: lat,
    lon: lng,
    maxDistance: 5,
    maxResults: 500,
    key: HIKINGPROJECT_API_KEY
  }
  $.getJSON(HIKINGPROJECT_ENDPOINT, params)
    .done(function(data) {
      //console.log( data );
      displayAllTrails(data.trails);
      numberOfTrailsFound(data);
      //console.log(data.trails);
    }).fail(function(data) {
      alert("getHikingProjectData Ajax call failed");
    });
}


//Display number of trails found
function numberOfTrailsFound(trails) {
  // console.log(trails.trails.length);
  let text = (trails.trails.length === 1) ? 'TRAIL' : 'TRAILS';
  $('.trailsfound').html(`${trails.trails.length} ${text} FOUND`);
}


//Display trail info
function displayAllTrails(trails) {
  $(".js-trails-container").empty();
  trails.forEach((trail, index) => {
    const trailDifficultyLevel = displayTrailDifficulty(trail.difficulty);
    const fillerTrailImg = fillMissingTrailImg(trail.imgMedium);
    $(".js-trails-container").append(`
			<div class="eachtrailcontainer">
				<div class="row removepadding">
					<div class="col-4">
						<div class="js-trail">
							<a href=${trail.url} target="_blank">
								<h3 class="js-trailname">${trail.name}</h3>
							</a>
							<p class="js-traillocation">${trail.location}</p>
							<div class="crop">
								<img class="js-trailimg" src=${fillerTrailImg} alt="image of trail"></img>
							</div>
							<h3 class="js-traillength">${trail.length} miles</h3>
							<p class="js-traildifficulty">${trailDifficultyLevel}</p>
							<p class="js-trailascentdescent">${trail.ascent}' Ascent &ensp; ${trail.descent}' Descent</p>
							<p class="js-trailsummary">${trail.summary}</p>
							<a class="js-learn-more" href=${trail.url} target="_blank">
								<i class="fa fa-info-circle" aria-hidden="true"></i><span class="trailnamemargin">Learn more</span>
							</a>
						</div>
					</div>
					<div class="col-8">
						<div id="map${index}" class="map"></div>
					</div>
				</div>
			</div>
		`);
    const trailMap = initMap(trail.latitude, trail.longitude, index);
  });
}


//Replace trail difficulty color value with description text
function displayTrailDifficulty(traildifflevel) {
  switch (traildifflevel) {
    case 'green':
      return "Easy: walking with no obstacles and low grades";

    case 'greenBlue':
      return "Easy/Intermediate";

    case 'blue':
      return "Intermediate: 10% grade, small rocks and roots, easy scrambling";

    case 'blueBlack':
      return "Intermediate/Difficult";

    case 'black':
      return "Difficult: 15% grade, large obstacles, possible scrambling or climbing";

    case 'blackBack':
      return 'Extremely Difficult: 20% grade, 15+" obstacles, many harder sections';

    default:
      return 'No rating available';
  }
}


//Replace empty trail images with a filler image
function fillMissingTrailImg(trailImg) {
  // if (trailImg === "") {
  //   return "https://upload.wikimedia.org/wikipedia/commons/2/22/Maudslay_running_trail_1.JPG";

  return trailImg || 'https://upload.wikimedia.org/wikipedia/commons/2/22/Maudslay_running_trail_1.JPG';

  // } else {
  //   return trailImg;
  // }
}



//G O O G L E    M A P S    C O D E//

//  Google Maps Marker Icons
//const GOOGLE_MAPS_ENDPNT = 'https://maps.googleapis.com/maps/api/js';
//const GOOGLE_MAPS_API_KEY = 'AIzaSyA6ECb06GHjgfRQjrOJKy6tQqScBimbFmA';

//Create map
function initMap(lat, lng, index) {
  let location = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  //New map
  let map = new google.maps.Map(document.getElementById('map' + index), {
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




//U I    C O D E//

//On browser load, hide boxInvalid, box2, & box3
function init() {
  $('#boxInvalid').hide();
  $('#box2').hide();
  $('#box3').hide();
}
init();


//Animate HTML and results on submit event
$('form').submit('#searchbutton', function(event) {
  event.preventDefault()
  const outputElem = $('.js-output');
  outputElem.prop('hidden', false);
  $('#box2').show();
  $('#box3').show();
  $('html, body').animate({
    scrollTop: $("#box2").offset().top
  }, 2100);
});


//Scroll-to-top button function
$(window).scroll(function() {
  let wScroll = $(this).scrollTop();
  let showScrollButton = 200;
  if (wScroll > showScrollButton) {
    $('#scroll-to-top').fadeIn();
  } else {
    $('#scroll-to-top').fadeOut();
  }
});


//Scroll-to-top on-click function
$('#scroll-to-top').click(function() {
  $('body,html').animate({
    scrollTop: 0
  }, 2000);
  return false;
});
