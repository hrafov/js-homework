let Ids = {    
    London: 2643743,
    Kiev: 703448,
    Warszawa: 7531926,
    LosAngeles: 5368381,
    NewYork: 5128594    
};
let citiesID = Ids.London + "," + Ids.Kiev + "," + Ids.Warszawa + "," + Ids.LosAngeles + "," + Ids.NewYork;
open();
//get weather data from localStorage
// if there is no weather data or it's older than 1 hour
// get new data from openweathermap.org
function getWeather() {
    if (!localStorage.getItem('weather') || (new Date().getTime() - JSON.parse(localStorage.getItem('weather')).updateTime) > 3600000) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/group",
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                id: citiesID,                
                units: "metric",
                APPID: "d08d25a1a79cafc20b079475e5400865"                
            },            
            success: function (response) {
                response["updateTime"] = new Date().getTime();
                localStorage.setItem("weather", JSON.stringify(response));
                displayWeather(response);
            }
        });
    } else
        displayWeather(JSON.parse(localStorage.getItem('weather')));
}
function open() {
    $(".city").fadeTo(0, 0.5);
    $(".description").slideUp(0);
    getWeather();
}
$(".city").on({
    mouseenter: function () {
        $(this).fadeTo("slow", 1);
    },
    mouseleave: function () {
        $(this).fadeTo("slow", 0.5);
        $(".description").slideUp("slow");
    },
    click: function () {
        $(this.getElementsByClassName("description")[0]).slideDown("slow");
    }
});
function displayWeather(weather) {
    var info = $(".description");
    for (var i = 0; i < info.length; i++) {
        var p = info[i].getElementsByTagName("p");
        var string = p[0].textContent.replace("null", weather.list[i].main.temp); //response.list[i].main.temp
        p[0].innerHTML = string;
        string = p[1].textContent.replace("null", weather.list[i].main.humidity); //response
        p[1].innerHTML = string;
        string = p[2].textContent.replace("null", weather.list[i].main.pressure); //response
        p[2].innerHTML = string;        
        string = p[3].textContent.replace("null", weather.list[i].main.temp_min); //response
        p[3].innerHTML = string;
        string = p[4].textContent.replace("null", weather.list[i].main.temp_max); //response
        p[4].innerHTML = string;
        string = p[5].textContent.replace("null", weather.list[i].wind.speed); //response
        p[5].innerHTML = string;        
        string = p[6].textContent.replace("null", weather.list[i].weather[0].description); //response
        p[6].innerHTML = string;
        var imageUrl = "http://openweathermap.org/img/w/" + weather.list[i].weather[0].icon + ".png";
        info[i].getElementsByTagName("img")[0].setAttribute("src", imageUrl);
    }
}
