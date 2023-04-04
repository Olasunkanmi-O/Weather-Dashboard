

// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
// https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric


// declaring global variables for ease of access
var apiKey = '6df1a64a30a7da7bf9c5be5027c23bd8';
var city = $('#search-input');

var baseUrl = 'https://api.openweathermap.org/data/2.5/';
var currentWeather = baseUrl + `weather?&appid=${apiKey}&units=metric&`;
var forecastWeather = baseUrl + `forecast?&appid=${apiKey}&units=metric&`
var date = moment().format('L');
var searchBtn = $('#search-button')




// function to get the data for current weather conditions 
function current (){
    // get data from the weather API while using input from user 
   return $.get(currentWeather + `q=${city.val()}`)
    .then((data)=>{        
        return data;   
    })
}

// call the current function to fetch the data and store it to a variable


// set a variable for the data gotten from the forecast URL 
let forecastWeatherData;

// function to get the data from the forecast URL 
function forecast (){
    const currentWeatherDataPromise = current();
   
    // Accessing data gotten previous function to generate the data for the forecast
  return  currentWeatherDataPromise.then((currentWeatherData)=>{
        
        // setting variable to be used in the forecast URL 
        var lon = currentWeatherData.coord.lon;
        var lat = currentWeatherData.coord.lat;
      
      // getting forecast data from the URL
     return $.get(forecastWeather + `q=${city.val()}`)
        .then((forecastData)=>{
           return forecastData                      
        })
    })
}

// storing the data from forecast function to a variable so it can be assessed through another function




// function to append the data to the browser in a readable format 
function displaycurrentWeather (){
    const currentWeatherDataPromise = current();
    // retrieving data from function current
    currentWeatherDataPromise.then((currentWeatherData)=>{
    var today = $('#today')    
    // icon to be used for current weather display
    var icon = currentWeatherData.weather[0].icon    
    // appending the data from the URL to the document body in a readable format
    today.append(`
    <div>
        <h2>${currentWeatherData.name}<small class="todayDate">(${date})</small>
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather_icon">
        </h2>
        <p>Temperature: ${Math.round(currentWeatherData.main.temp)}&degC</p>
        <p>Humidity: ${currentWeatherData.main.humidity}%</p>
        <p>Wind Speed: ${currentWeatherData.wind.speed}m/s</p>
        <p class="mb">UV index: ${currentWeatherData.wind.speed}</p>                        
    </div>
    `)}
)}




// function to append data from forecast URL to the browser 
function displayForecastWeather(){
    const forecastWeatheDataPromise = forecast()
    //retrieving data from function forecast
    forecastWeatheDataPromise.then((forecastData)=>{
        var forecast = $('#forecast')
        // looping over the objects of forecast weather to be displayed in a readable format
        for (var obj of forecastData.list) {   
            //store the icon object to a variable  
            var imageIcon = obj.weather[0].icon
            //creating the elements that contain the 5-days forecast data for only noon time
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



// function to retrieve the key-value pair from local storage
function getLocation (){
    // Getting an array of the stored key from local storage or get an empty array 
     return JSON.parse(localStorage.getItem('cities')) || []
}

// function to store uuser input to local storage
function storeLocation (){
    // store the data from local storage to a variable
    var storedLocation = getLocation();
    // Get user input and validate to avoid unwanted input
    var cityName = city.val().trim()
    // adding new input to the array to be stored in local storage
    storedLocation.push(cityName);
    // store the new array to local storage 
    localStorage.setItem('cities', JSON.stringify(storedLocation))
}


// function to display the history of locations that have been searched 
function displayLocation (){
    // reterive the data from local storage
    var storedLocation = JSON.stringify(localStorage.getItem('cities'))
    // create unique value of all the cities
    uniqueValue = [... new set (storedLocation)]
    console.log(uniqueValue)
    
}

// function to initiate the app

// function init(){   
    
//     getLocation()    
//     displaycurrentWeather()
//     displayForecastWeather()    
//     storeLocation()
    
// }

$(document).ready(function(){
    searchBtn.on('click', (event)=>{        
    event.preventDefault()
    if(city === null){
        return
    }else{   

    displaycurrentWeather()
    displayForecastWeather()
    }
    })

    
})

    







// // getting the city from the user to populate the API
// function getInput(cityName) {
//     // current data request from weather API
//     $.get(currentWeather + `q=${cityName}`)
//         .then(function (currentData) {

//             // inputs from the current date to populate forecast data
//             var lon = currentData.coord.lon;
//             var lat = currentData.coord.lat;
//             var date = moment().format('L');
//             var icon = currentData.weather[0].icon

//             // 5-day forecast weather request from weather API
//             $.get(forecastWeather + `lat=${lat}&lon=${lon}`)
//                 .then(function (forecastData) {

//                     var today = $('#today')
//                     var forecast = $('#forecast')

//                     today.append(`
//                     <div>
//                         <h2>${currentData.name}<small class="todayDate">(${date})</small>
//                             <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather_icon">
//                         </h2>
//                         <p>Temperature: ${Math.round(currentData.main.temp)}&degC</p>
//                         <p>Humidity: ${currentData.main.humidity}%</p>
//                         <p>Wind Speed: ${currentData.wind.speed}m/s</p>
//                         <p class="mb">UV index: ${currentData.wind.speed}</p>                        
//                     </div>           
//                     `)

//                     // looping over forecast data for every 3hours to get the noon data for the 5 days
//                     for (var obj of forecastData.list) {
//                         var imageIcon = obj.weather[0].icon
//                         //creating the elements that contain the 5-days forecast data for only noon time
//                         if (`${obj.dt_txt}`.includes('12:00:00')) {
//                             forecast.append(`                            
//                             <div>
//                                 <h5>${moment(obj.dt_txt).format('L')}</h5>
//                                 <img src="https://openweathermap.org/img/w/${imageIcon}.png" alt="weather_icon">                    
//                                 <p>Temp: ${obj.main.temp}&degC</p>
//                                 <p>Humidity: ${obj.main.humidity}%</p>
//                             </div>
//                             `)
//                         }
//                     }

//                 })

//         }
//         )

// }

// // function to display locations stored in local storage 
// function displayCity(cities) {
//     var storedCity = JSON.parse(localStorage.getItem('cities'))
//     uniqueStorage = [... new Set(storedCity)]
//     console.log(uniqueStorage)
//     uniqueStorage.forEach((city)=>{
//         $('#history').prepend(`
//         <ul>
//             <li class="cities">${city}</li>
//         </ul>
//         `)
//     })
//     $('#clearBtn').removeClass('hide')
    
// }

// function clearHistory() {

//     $('#history').remove()
//     $('section').remove()
//     localStorage.clear()

// }

// // function to store the user's input to local storage 
// function saveCity() {
//     var cityName = city.val().trim()
//     var storedCity = getCity()
//     storedCity.push(cityName)

//     localStorage.setItem('cities', JSON.stringify(storedCity))
   
// }

// function getCity (){
//     return JSON.parse(localStorage.getItem('cities')) || []
    
// }


// function init() {

//     $('#search-button').on('click', function (event) {
//         var cityName = city.val().trim()
//         //code to prevent form default of refresh   
//         event.preventDefault()
//         // code to prevent actions if there's no input from user
        

//         getInput(cityName);

//         saveCity()
//         displayCity()
        
//     })

//     $('#clearBtn').on('click', clearHistory)



// }


// init()























