const API_KEY ="74884869bc015a05009c4fb064470498";

const cityInputEl = document.getElementById('cityInput');
const btnSubmit = document.getElementById('btnSubmit');
const weatherDegree = document.getElementById('weatherDegree');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');



async function getData (cityInputValue){
    try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${API_KEY}&units=metric`)
    if(!res.ok)
    {
        throw new Error ("Network response was not Ok");
    }
    const data =await res.json();
    weatherDegree.textContent = `${Math.floor(data.main.temp)} °C`;
    weatherDescription.textContent = data.weather[0].description;
    const iconId = data.weather[0].icon;
    weatherIcon.innerHTML =`<img class="w-32" src="http://openweathermap.org/img/wn/${iconId}.png" alt="Weather Icon"/>`; 
    const weatherOtherDetail =[
        `Humidity: ${data.main.humidity} °C`,`Feel like: ${data.main.feels_like}`,`Wind Speed: ${data.wind.speed}`
    ]
    document.querySelector('ol').innerHTML = weatherOtherDetail.map((detail)=>{
        return `<li class="bg-[#2b3f5d]">${detail}</li>`;
    }).join("");
    cityInputEl.value = "";
    }
    catch (error)
    {

    weatherDegree.textContent = "";
    weatherDescription.textContent = "An error happend, please try again later!";
    weatherIcon.innerHTML =""; 
    document.querySelector('ol').innerHTML = "";
    }
}

btnSubmit.addEventListener('click',()=>{
    const cityInputValue = cityInputEl.value;
    if(cityInputValue =="")
    {
        alert('Please give the input');
    }
    else
    {
    getData(cityInputValue);
    }
})
