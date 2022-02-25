const express = require ('express');

const bodyParser = require ('body-parser');

const https = require ('https');
const {json} = require ('express/lib/response');

const app = express ();

app.use (express.static ('public'));

app.use (bodyParser.urlencoded ({extended: true}));

app.set ('view engine', 'ejs');
let dayIndex = new Date ().getDay ();
let monthIndex = new Date ().getMonth ();

const day = [
  'sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

app.get ('/', (req, res) => {
  res.render ('search');
});

app.post ('/', (req, res) => {
  const query = req.body.cityName;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=05daf4e58034d536112bc33725d3b1c4&units=metric`;
  https.get (url, response => {
    response.on ('data', data => {
      const weatherData = JSON.parse (data);
      let city = weatherData.name;
      let temp = Math.round (weatherData.main.temp);
      let description = weatherData.weather[0].description;
      let max_temp = Math.round (weatherData.main.temp_max);
      let min_temp = Math.round (weatherData.main.temp_min);
      let dayName = day[dayIndex];
      let monthName = month[monthIndex];
      let date = new Date ().getDate ();
      let year = new Date ().getFullYear ();
      let icon = weatherData.weather[0].icon;
      let imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

      res.render ('index', {
        city: city,
        temp: temp,
        imageURL: imageURL,
        description: description,
        max_temp: max_temp,
        min_temp: min_temp,
        dayName: dayName,
        date: date,
        monthName: monthName,
        year: year,
      });
    });
  });
});

app.listen (3000);

/*

*/
