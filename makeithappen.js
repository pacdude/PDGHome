$(document).ready(function() {
	$(function() {
		$("#GoogleSearch").focus();
	});
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getWeather);
	}
});

function getWeather(position) {
	var crd = position.coords;
	var lat = crd.latitude;
	var long = crd.longitude;
	var DarkSkyAPI = //your DarkSky API secret key here, in quotes
	var Locale = ("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=true");
	var DarkSky = ("https://api.darksky.net/forecast/"+DarkSkyAPI+"/"+lat+","+long);
	$.getJSON(Locale, function(locdata) {
		console.log(locdata);
		$('.weather #location').html(locdata.results[2].formatted_address.toString().split(",")[0]);
	});
	$.getJSON(DarkSky + "?callback=?", function(weatherdata) {
		console.log(weatherdata);
		$('body').css('background-image','url(https://source.unsplash.com/1600x900/?'+weatherdata.currently.summary+')');
		$('.weather #temperature').html("<i class='wi wi-forecast-io-" + weatherdata.currently.icon + "'></i>" + "&nbsp;" + weatherdata.currently.temperature.toString().split(".")[0] + "&#176;");
		$('.weather #conditions').html(weatherdata.minutely.summary);
	});
};
$("#GoogleSearch").keyup(function(event) {
	if (event.keyCode == 13) {
		$("#GoLook").click();
	}
});