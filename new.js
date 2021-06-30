var weatherButton = document.getElementById("weatherButton")
var userInputEl = document.getElementById("userInput")


function getWeather() {
    var clearTodayEl = document.getElementById("today")
    var clearFiveDay = document.getElementById("fiveDay")



    while (clearTodayEl.hasChildNodes()) {
        clearTodayEl.removeChild(clearTodayEl.firstChild);
    }
    while (clearFiveDay.hasChildNodes()) {
        clearFiveDay.removeChild(clearFiveDay.firstChild);
    }
    var city = userInputEl.value;

    var city = userInputEl.value;

    var cityList = document.createElement("ul");
    var cityAdd = document.createElement("a")
    cityAdd.textContent = city
    document.getElementById("city").appendChild(cityList);
    cityList.appendChild(cityAdd);

    function enterCity() {
        console.log("click")
        var oldCity = this.textContent
        userInputEl.value = oldCity;

        getWeather()
    }
    cityAdd.addEventListener("click", enterCity);



    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + "f57cc3d88487e632b111d5d350ce8f21&")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;


            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + "f57cc3d88487e632b111d5d350ce8f21&")
                .then(function (res) {
                    return res.json();
                }).then(function (data) {
                    console.log(data);


                    // today
                    var colToday = document.createElement("div");
                    var cardToday = document.createElement("div");
                    var dateToday = document.createElement("p");
                    var tempToday = document.createElement("p");
                    var humToday = document.createElement("p");
                    var windToday = document.createElement("p");
                    var uviToday = document.createElement("p");


                    var iconHrefToday = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";

                    console.log(iconHrefToday);
                    var iconToday = document.createElement('img');
                    iconToday.src = iconHrefToday;


                    colToday.classList.add("col-4");
                    cardToday.classList.add("card");

                    colToday.appendChild(cardToday);
                    cardToday.appendChild(dateToday);
                    cardToday.appendChild(tempToday);
                    cardToday.appendChild(humToday);
                    cardToday.appendChild(windToday);
                    cardToday.appendChild(iconToday);
                    cardToday.appendChild(uviToday);


                    todayTimestamp = data.current.dt
                    var d = new Date(todayTimestamp * 1000)
                    console.log(d)
                    yyyy = d.getFullYear(),
                        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
                        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
                        todayDt = yyyy + '-' + mm + '-' + dd


                    dateToday.textContent = todayDt;
                    tempToday.textContent = "Daytime temp (in K): " + data.current.temp.day;
                    humToday.textContent = "Humidity: " + data.current.humidity;
                    windToday.textContent = "Wind Speed: " + data.current.wind_speed;
                    uviToday.textContent = "UVI: " + data.current.uvi;


                    document.getElementById("today").appendChild(colToday);





                    // 6 day forcast

                    for (let i = 1; i < data.daily.length; i++) {
                        if (i === 7) { break; }

                        var col = document.createElement("div");
                        var card = document.createElement("div");
                        var date = document.createElement("p");
                        var temp = document.createElement("p");
                        var hum = document.createElement("p");
                        var wind = document.createElement("p");
                        var uvi = document.createElement("p");


                        var iconHref = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";

                        console.log(iconHref);
                        var icon = document.createElement('img');
                        icon.src = iconHref;


                        col.classList.add("col-4");
                        card.classList.add("card");

                        col.appendChild(card);
                        card.appendChild(date);
                        card.appendChild(temp);
                        card.appendChild(hum);
                        card.appendChild(wind);
                        card.appendChild(icon);
                        card.appendChild(uvi);


                        timestamp = data.daily[i].dt
                        var d = new Date(timestamp * 1000)
                        console.log(d)
                        yyyy = d.getFullYear(),
                            mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
                            dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
                            time = yyyy + '-' + mm + '-' + dd
                        
                   


                        date.textContent = time;
                        temp.textContent = "Daytime temp (in K): " + data.daily[i].temp.day;
                        hum.textContent = "Humidity: " + data.daily[i].humidity;
                        wind.textContent = "Wind Speed: " + data.daily[i].wind_speed;
                        uvi.textContent = "UVI: " + data.daily[i].uvi;


                        document.getElementById("fiveDay").appendChild(col);

                    }
                    // var node = document.createElement("LI");                 
                    // var day1 = document.createElement('h3');
                    // var temp = document.createElement('h3');
                    // var wind = document.createElement('h3');
                })
        })

}


weatherButton.addEventListener("click", getWeather)