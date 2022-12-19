


var apiKey = '6df1a64a30a7da7bf9c5be5027c23bd8';
var city = 'toronto' 
var today = $('#today')
var forecast = $('#forecast')




// code to get the data of current weather condition from the Open Weather URl
$.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(function (currentData) {
        console.log(currentData)

        var lon = currentData.coord.lon;
        var lat = currentData.coord.lat;
        var date = moment().format('L');
        var icon = currentData.weather[0].icon

        today.append(`
        <div class="currentSummary">
            <h2>${currentData.name}<small class="todayDate">(${date})</small>
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather_icon">
            </h2>
            <p>Temperature: ${Math.round(currentData.main.temp)}&degC</p>
            <p>Humidity: ${currentData.main.humidity}%</p>
            <p>Wind Speed: ${currentData.wind.speed}m/s</p>
            <p class="mb">UV index: ${currentData.wind.speed}</p>
        </div>
        `)


        // code to get the data of future weather condition from the Open Weather URl
        $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(function (forecastData) {
                console.log(forecastData.list)
                for (var obj of forecastData.list){
                    var imageIcon = obj.weather[0].icon
                   if(`${obj.dt_txt}`.includes('12:00:00')){
                    console.log(`
                    https://openweathermap.org/img/w/${imageIcon}.png}
                    ${obj.dt_txt}
                    ${obj.main.temp}s
                    ${obj.main.humidity}
                    `)
                }}
                


            });


    });






//      