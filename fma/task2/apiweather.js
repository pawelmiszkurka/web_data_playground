/*
 
Module: Web Data with XML, JSON and Ajax - 2016/2017
Assignment: Final Marked Assignment  Task 2
Date: 02/04/2017
Author: Pawel Miszkurka
Number: 13007376
  
Resources and helpful links:
  https://en.wikipedia.org/wiki/Wind_chill
  http://api.jquery.com/jQuery.ajax/
  https://www.freemathhelp.com/wind-chill.html
  https://v4-alpha.getbootstrap.com/content/tables/
*/


$(document).ready(function(){
	
	$('#countries').change(function(){

		// hold value of the selected country
		var selectedCountry = $(this).val();

		//dynamically load cities into cities option menu
		$('#cities').load(selectedCountry + '-cities' + '.html');


	});

	$('#cities').change(function () {
		
		// hold value of a selected city. Will be required for API call to retrieve data
		var id = $(this).val();
		var apiKey = '0564347a79a2da5b7f553c6f02eaf5d2';
		// completed url to retrieve the data
		var url = 'http://api.openweathermap.org/data/2.5/weather?id=' + id + '&APPID=' + apiKey;
		$.ajax({

			url: url,
			type: 'GET',
			dataType: 'json',

			success: function (response) {
					console.log(response);

				// clear div vefore every operation https://api.jquery.com/empty/
				$('#weathercondition').empty();

				var sTxt = '';

				sTxt = '<h4>Weather in ' + response.name + ' on ' + dateConvert(response.dt) + '</h4>' +
						'<p>Wether Condition: ' + response.weather[0].main + '</p>' +
						'<p>Temperature: ' + tempConvert(response.main.temp) + '&deg;C</p>' +
						'<p>Wind Speed: ' + speedConvert(response.wind.speed) + 'mph</p>' +
						'<p>Wind Direction: ' + response.wind.deg + 'mph</p>';

				//update html page witht results
				$('#weathercondition').append(sTxt);

			},
			// ajax error handling https://www.sitepoint.com/jquery-ajax-error-handling-function/
			error: function(jqXHR, exception) {
	            if (jqXHR.status === 0) {
	               $('#info').append('Not connect.n Verify Network.');
	            } else if (jqXHR.status == 404) {
	               $('#info').append('Requested page not found. [404]');
	            } else if (jqXHR.status == 500) {
	               $('#info').append('Internal Server Error [500].');
	            } else if (exception === 'parsererror') {
	               $('#info').append('Requested JSON parse failed.');
	            } else if (exception === 'timeout') {
	               $('#info').append('Time out error.');
	            } else if (exception === 'abort') {
	               $('#info').append('Ajax request aborted.');
	            } else {
	               $('#info').append('Uncaught Error.n' + jqXHR.responseText);
	            }
        	}

		})



	});

});


// funciton to convert Kelvin to Celsius
//https://www.w3schools.com/howto/howto_js_temperature_converter.asp

function tempConvert (val) {
	return Math.round(val-273.15);
}

// Convert unix time stamp to standard date
//
//http://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
function dateConvert (val) {

	var date = new Date(val *1000);
	// get day
	var day = date.getDate();
	// get month requires incrementation by 1 as it returns values from 0-11
	var month = (date.getMonth()+1);
	// get full year
	var year =  date.getFullYear();

	return day + '-' + month + '-' + year;
}


function speedConvert (val) {
	return Math.round(val * 1.51);
}




