const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const day = document.getElementById("day");
const date = document.getElementById("today_date");

const datahide = document.querySelector('.middle_layer');

const temp_real_value = document.getElementById('temp_real_value');

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === "") {
        city_name.innerText = `Please write the name of the city`;
        datahide.classList.add('data_hide');
    }else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=a6860fcc020c1fa05941883a675c91da`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            // temp.innerHTML = Math.round(arrData[0].main.temp);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_value.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main;

            //condition to check sunny or cloudy
            if (tempMood == "Sunny") {
                temp_status.innerHTML = "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rainy") {
                temp_status.innerHTML = "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            }

            // console.log(arrData);

            datahide.classList.remove('data_hide');

            let weekday = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];

            let lol = new Date();
            let dayss = weekday[lol.getDay()];
            day.innerText = dayss;
            date.innerHTML = lol.getDate();
        }
        catch {
            city_name.innerText = `Please Write the city name properly`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);

