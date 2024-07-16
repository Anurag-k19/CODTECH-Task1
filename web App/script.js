const inputBox = document.querySelector('#input_text')
const  searchBtn = document.getElementById('searchBtn');
const weatherImage = document.querySelector('.weather_image');
const temperature = document.querySelector('.temperature_text');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity_percentage');
const Wind = document.getElementById('Wind_Speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.web_container');





async function checkWeather(city){
    const apikey = `f44f1aa46a50bd4badcecb1191cc0cbd`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const weather_data =  await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod===`404`){
        location_not_found.style.display= "flex";
        weather_body.style.display = "none";

        return;
    }

    location_not_found.style.display= "none";
    weather_body.style.display = "block";

    console.log(weather_data);
    temperature.innerHTML=`${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML= `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    Wind.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weatherImage.src = "/images/clouds.png";
            break;
        case 'Clear':
            weatherImage.src = "/images/clear.png";
            break;
        case 'Rain':
            weatherImage.src = "/images/rain.png";
            break;
        case 'Mist':
            weatherImage.src = "/images/mist.png";
            break;
        case 'Snow':
            weatherImage.src = "/images/snow.png";
            break;
        case 'Drizzle':
            weatherImage.src = "/images/drizzle.png";
            break;
    }

    
}
searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});