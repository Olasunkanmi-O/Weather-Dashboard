

// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
// https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric



var apiKey = '6df1a64a30a7da7bf9c5be5027c23bd8';
var city = $('#search-input')
var baseUrl = 'https://api.openweathermap.org/data/2.5/';
var currentWeather = baseUrl + `weather?&appid=${apiKey}&units=metric&`;
var forecastWeather = baseUrl + `forecast?&appid=${apiKey}&units=metric&`




function getInput(cityName) {
    $.get(currentWeather + `q=${cityName}`)
        .then(function (currentData) {

            console.log(currentData)

            var lon = currentData.coord.lon;
            var lat = currentData.coord.lat;
            var date = moment().format('L');
            var icon = currentData.weather[0].icon


            $.get(forecastWeather + `lat=${lat}&lon=${lon}`)
                .then(function (forecastData) {

                    var today = $('#today')
                    var forecast = $('#forecast')

                    today.append(`
                    <div>
                        <h2>${currentData.name}<small class="todayDate">(${date})</small>
                            <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather_icon">
                        </h2>
                        <p>Temperature: ${Math.round(currentData.main.temp)}&degC</p>
                        <p>Humidity: ${currentData.main.humidity}%</p>
                        <p>Wind Speed: ${currentData.wind.speed}m/s</p>
                        <p class="mb">UV index: ${currentData.wind.speed}</p>                        
                    </div>           
                    `)


                    for (var obj of forecastData.list) {
                        var imageIcon = obj.weather[0].icon
                        if (`${obj.dt_txt}`.includes('12:00:00')) {
                            forecast.append(`
                            
                            <div>
                                <h5>${moment(obj.dt_txt).format('L')}</h5>
                                <img src="https://openweathermap.org/img/w/${imageIcon}.png" alt="weather_icon">                    
                                <p>Temp: ${obj.main.temp}&degC</p>
                                <p>Humidity: ${obj.main.humidity}%</p>
                            </div>
                            `)
                        }
                    }

                })

        }
        )

}

function init() {
    $('#search-button').on('click', function (event) {
       var cityName = city.val().trim()
        event.preventDefault()
        getInput(cityName);
       
    })

}

init()

















// function getLocation() {
//     return JSON.parse(localStorage.getItem('cities')) || []
// }


// function saveLocation() {
//     var cityName = city.val()
//     var cities = getLocation();
//     cities.push(cityName)

//     localStorage.setItem('cities',JSON.stringify(cities))

   
// }






// function displayLocation() {
//     var getCity = getLocation()

//     for (var city of getCity){
//         $('#history').prepend(`
//         <ul>
//             <li>${city}</li>
//         </ul>
//         `)
//     }

//     // getCity.forEach(function(city){
//     //     $('#history').prepend(`
//     //     <ul>
//     //         <li>${city}</li>
//     //     </ul>
//     //     `)
//     // })
    
// }



