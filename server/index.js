require('dotenv/config')
const express = require('express');
const fetch = require('node-fetch');

const staticMiddleware = require('./static-middleware');
const app = express();

app.use(staticMiddleware);
app.use(express.json());

  app.get('/api/weather/:city', (req,res,next)=>{
    const {city} = req.params;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_KEY}`)
      .then(result => result.json())
      .then(weatherData => {
        fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${weatherData.coord.lat},${weatherData.coord.lon}&timestamp=1331161200&key=${process.env.TIME_KEY}`)
        .then(result2 => result2.json())
        .then(timeData=>{
          res.status(200).json({weatherData,timeData})
        })
          .catch(err => next(err))
      })
      .catch(err=>res.json(err));
  })

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
