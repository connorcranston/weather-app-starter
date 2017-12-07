// Weather API endpoint
const api_root = 'http://api.openweathermap.org/data/2.5/weather?zip='

//API key
var api_key = 'bdb3f513087fa28d44c1a734e4e1ef9f'

//select elements from the DOM
var city_name = document.querySelector('#city_name')
var zip = document.querySelector('.searchBox')
var weather = document.querySelector('.weather')
var temp = document.querySelector('.temp')
var humid = document.querySelector('.humid')
var convert = document.querySelector('.convert')
var icon = document.querySelector('#iconBox')

var temper
var state = true

function kelvinToFahreinheit(kelvin){
    return Math.round(kelvin * (9/5) - 459.67)
}

function fahreinheitToCelsius(faren){
    return Math.round((faren - 32) * 5/9)
}

function addIcon(w){
    console.log(w)
    if(w == "Cloudy"){
        icon.src = 'img/cloudy.png'
    }
    if(w == "Clouds"){
        //icon.setAttribute('src', 'img/cloudy.png')
        icon.src = 'img/clouds.png'
    }    
    if(w == "Partly-cloudy"){
        icon.src = 'img/partly.cloudy.png'
    }
    if(w == "Rain"){
        icon.src = 'img/rain.png'
    }
    if(w == "Snow"){
        icon.src = 'img/snow.png'
    }
        if(w == "Sun"){
        icon.src = 'img/sun.png'
    }
        if(w == "Thunderstorm"){
        icon.src = 'img/thunderstorm.png'
    }
        if(w == "Clear"){
        icon.src = 'img/clear.png'
    }
}

function getWeather(zipCode){
$.ajax({
        type: "GET",
        url: `${api_root}${zipCode},us&appid=${api_key}`,
        dataType: "json",
        success: function(data){
            console.log(data)
            temper = kelvinToFahreinheit(data.main.temp)
            weather.textContent = data.weather[0].main
            addIcon(data.weather[0].main)
            city_name.textContent = data.name
            temp.innerHTML = `${temper} &deg;`
            humid.textContent = `${data.main.humidity}%`
        },
        error: function(error){
            console.log(error)
         }
    })
}

getWeather('33166')

zip.addEventListener('keypress', function(e){
    if(e.keyCode == 13){
    getWeather(this.value)
    }
})

convert.addEventListener('click', function(){
    //console.log(fahreinheitToCelsius(temper))
    if(state == true){
    temp.innerHTML = `${fahreinheitToCelsius(temper)} &deg C`
    state = false
    } else {
        temp.innerHTML = `${temper} &deg F;`  
        state = true  
    }
}) 