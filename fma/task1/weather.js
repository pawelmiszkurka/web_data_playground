/*
 
Module: Web Data with XML, JSON and Ajax - 2016/2017
Assignment: Final Marked Assignment Task 1
Date: 02/04/2017
Author: Pawel Miszkurka
Number: 13007376
  
Resources and helpful links:
  https://en.wikipedia.org/wiki/Wind_chill
  http://api.jquery.com/jQuery.ajax/
  https://www.freemathhelp.com/wind-chill.html
  https://v4-alpha.getbootstrap.com/content/tables/
*/


$(document).ready(function() {

 // Funciton implemented to retrieve data from JSON 
 function updateConditions() {
  $.ajax({
   url: 'weather.json',
   type: 'GET',
   dataType: 'json',

   success: function(response) {
    // variable to hold display format output of the response
    var sTxt = '';

    $('#condition').html('');

    sTxt += '<thead><tr><th>City</th><th>Current Condition</th><th>Temperature</th><th>Wind Speed</th><th>Wind Direction</th><th>Wind Chill Factor</th></tr></thead>';

    $.each(response.conditions, function(index) {
     // I parse temperature and wind_speed value to variable in case I'd like to use it with a function to calculate wind chill value 
     temperature = response.conditions[index].temperature;
     wind_speed = response.conditions[index].wind_speed;
     sTxt += '<tr><td>' +
      response.conditions[index].city_name + '</td><td>' +
      response.conditions[index].current_conditions + '</td><td>' +
      temperature + '&deg;C</td><td>' +
      wind_speed + ' Mph</td><td>' +
      response.conditions[index].wind_direction + '</td><td>' +

      //Wind chill factor is a variable and should be calculated useing temperature and wind speed. 
      // better sollution calculateChill(temperature, wind_speed);
      response.conditions[index].wind_chill_factor +
      '</td></tr>';
    });
    $('#condition').append(sTxt);
   },
   error: function(jqXHR, status, err) {
    $('#info').html('<p>Data cannot be currently retrieved.<br> Please check the content store</p>');
   }
  });
 }
 setTimeout(updateConditions, 10);
});

/*
function to calclate chill factor 

function calculateChill(tempC, speed) {
  var chill = (13.12 + (.6215 * tempC)) - (11.37 * Math.pow(speed, .16)) + (.3965 * (tempC * Math.pow(speed, .16)));
  return chill;
}

*/