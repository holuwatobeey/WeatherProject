const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req,res) =>{
  res.sendFile(__dirname + "/index.html")
})

app.post('/', (req,res)=>{
    const query = req.body.cityName;
    const apiKey = "4dde7a6b2f1892e9bc2f11619580f701";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, (response)=>{

        response.on('data',(data)=>{
            const WeatherData = JSON.parse(data);
            const desc = WeatherData.weather[0].description;
            const temp = WeatherData.main.temp;
            const icon = WeatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write('<p>The Weather in ' + query + ' is ' + temp + ' degree celsius</p>');
            res.write('<p> ' + desc + '</p>');
            res.write('<img src=' + imageUrl + '/>');
            res.send()
        })
    })
})

app.listen(2020, function(){
    console.log('Server is running on port 2020')
})
