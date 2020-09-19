$('body').on('click', ".sm-days", function() {

    if ($(this).find('.day-weather-icon > i').hasClass('wi-day-sunny')) {
        $('body').css({
            'background': 'url(images/wi-day-sunny.jpg) center center / cover fixed'
        });
    }

    if ($(this).find('.day-weather-icon > i').hasClass('wi-day-cloudy')) {
        $('body').css({
            'background': 'url(images/wi-day-cloudy.jpg) center center / cover fixed'
        });
    }

    if ($(this).find('.day-weather-icon > i').hasClass('wi-cloud')) {
        $('body').css({
            'background': 'url(images/wi-cloud.jpg) center center / cover fixed'
        });
    }

    if ($(this).find('.day-weather-icon > i').hasClass('wi-cloudy')) {
        $('body').css({
            'background': 'url(images/wi-cloudy.jpg) center center / cover fixed'
        });
    }

    if ($(this).find('.day-weather-icon > i').hasClass('wi-showers')) {
        $('body').css({
            'background': 'url(images/wi-showers.jpg) center center / cover fixed'
        });
    }

    if ($(this).find('.day-weather-icon > i').hasClass('wi-rain')) {
        $('body').css({
            'background': 'url(images/wi-rain.jpg) center center / cover fixed'
        });
    }

    if ($(this).find('.day-weather-icon > i').hasClass('wi-thunderstorm')) {
        $('body').css({
            'background': 'url(images/wi-thunderstorm.jpg) center center / cover fixed'
        });
    }

    if ($(this).find('.day-weather-icon > i').hasClass('wi-snow')) {
        $('body').css({
            'background': 'url(images/wi-snow.jpg) center center / cover fixed'
        });
    }

    if ($(this).find('.day-weather-icon > i').hasClass('wi-fog')) {
        $('body').css({
            'background': 'url(images/wi-fog.jpg) center center / cover fixed'
        });
    }

// Weather Info Replacement
var icon = $(this).find('i').attr("class");
var temp = $(this).find('.day-weather-info').html();
var day = $(this).find('.day').html();

$('.current-city-weather>i').removeClass().addClass(icon); $('.current-city-temp').html(temp);0
 $('.current-city-day').html(day);
$('.current-city-weather').addClass('fadeInUp'); setTimeout(function() {
    $('.current-city-weather').removeClass('fadeInUp');
}, 1000);
});

var Coordinates = function(lat, lon) {
    this.latitude = lat;
    this.longitude = lon;
}

var coord = new Coordinates(0, 0);

function getIcon(description) {
    var icon = ""
/*
<div class='icon sun-shower'>
  <div class='cloud'></div>
  <div class='sun'>
    <div class='rays'></div>
  </div>
  <div class='rain'></div>
</div>

<div class='icon thunder-storm'>
  <div class='cloud'></div>
  <div class='lightning'>
    <div class='bolt'></div>
    <div class='bolt'></div>
  </div>
</div>

<div class='icon cloudy'>
  <div class='cloud'></div>
  <div class='cloud'></div>
</div>

<div class='icon flurries'>
  <div class='cloud'></div>
  <div class='snow'>
    <div class='flake'></div>
    <div class='flake'></div>
  </div>
</div>

<div class='icon sunny'>
  <div class='sun'>
    <div class='rays'></div>
  </div>
</div>

<div class='icon rainy'>
  <div class='cloud'></div>
  <div class='rain'></div>
</div>*/
    switch (description) {
      case "sky is clear":
            icon = "<div class='icon sunny'>\
              <div class='sun'>\
                <div class='rays'></div>\
              </div>\
            </div>";
            break;
        case "clear sky":
            icon = "<div class='icon sunny'>\
              <div class='sun'>\
                <div class='rays'></div>\
              </div>\
            </div>";
            break;
        case "few clouds":
            icon = "<div class='icon cloudy'>\
              <div class='cloud'></div>\
              <div class='cloud'></div>\
            </div>";
            break;
        case "scattered clouds":
            icon = "<div class='icon cloudy'>\
              <div class='cloud'></div>\
              <div class='cloud'></div>\
            </div>";
            break;
        case "broken clouds":
            icon = "<i class='wi wi-cloudy'></i>";
            break;
        case "shower rain":
            icon = "<div class='icon rainy'>\
              <div class='cloud'></div>\
              <div class='rain'></div>\
            </div>";
            break;
        case "light rain":
        icon = "<div class='icon rainy'>\
          <div class='cloud'></div>\
          <div class='rain'></div>\
        </div>";
        break;
        case "rain":
            icon = "<div class='icon rainy'>\
              <div class='cloud'></div>\
              <div class='rain'></div>\
            </div>";
            break;
        case "thunderstorm":
            icon = "<i class='wi wi-thunderstorm'></i>";
            break;
        case "snow":
            icon = "<i class='wi wi-snow'></i>";
            break;
        case "mist":
            icon = "<i class='wi wi-fog'></i>";
            break;
    }
    return icon;
}


function renderWeather(data) {
    //console.log(data)

    var weatherDays = data.list.length;
    var htmlToAppend = "";
    for (var i = 0; i < weatherDays; i++) {
        var day = new Date(data.list[i].dt * 1000).toString().split(" ").shift();
        var temperature = "<h2>" + data.list[i].temp.day + "<sup>o</sup>C</h2>";

        htmlToAppend += "<div class='sm-days columns'>\
                              <div class='day'>\
                                " + day + "\
                              </div>\
                              <div class='day-weather-icon'>\
                                " + getIcon(data.list[i].weather[0].description) + "\
                              </div>\
                              <div class='day-weather-info'>\
                                " + temperature + "\
                              </div>\
                            </div>"
    }

    $("#week").html(htmlToAppend);
    $(".current-city-name").html("<h2>" + data.city.name + "</h2>");
    $(".current-city-temp").html("<h2>" + data.list[0].temp.day + "<sup>o</sup>C</h2>");
    $(".current-city-weather").html(getIcon(data.list[0].weather[0].description));
    $(".current-city-day").html(new Date(data.list[0].dt * 1000).toString().split(" ").shift());
    $("body").show();
}

function getWeather() {

    var APPID = "83e2622fd44fbc000e40d8aa8e5f3d94";
    var url = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + coord.latitude + "&lon=" + coord.longitude + "&APPID=" + APPID + "&mode=json&cnt=7&units=metric";
    $.getJSON(url, renderWeather);
}

if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
        coord.latitude = position.coords.latitude;
        coord.longitude = position.coords.longitude;
        getWeather();
    });
} else {
    /* geolocation IS NOT available */
    alert("Please update to the latest version of chrome or firefox")
}
