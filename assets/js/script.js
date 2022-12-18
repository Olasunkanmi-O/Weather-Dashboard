





var apiKey = '6df1a64a30a7da7bf9c5be5027c23bd8';
var city = 'alabama'

// code to get the data of current weather condition from the Open Weather URl
$.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(function (currentData) {
        console.log(currentData)

        var lon = currentData.coord.lon;
        var lat = currentData.coord.lat;




        // code to get the data of future weather condition from the Open Weather URl
        $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(function (forecastData) {
                console.log(forecastData.list[2].dt_txt)
            });
    });


function init (){

}

init()
