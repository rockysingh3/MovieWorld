const express = require('express');
const app = express();
const request = require('request');
const config = require('./app');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));







app.get("/", (req, res) => {
  res.render("home");
});



// makes the request to the api
app.get('/showMovies', (req, res) => {

    let query = req.query.search;
    let urlWithoutId = "http://www.omdbapi.com/?s=" + query + config.id;
    request(urlWithoutId, (error, response, body) => {
      if(!error && response.statusCode == 200){
        let apiResults = JSON.parse(body);
        //console.log(apiResults);
          res.render("showMovies", {data: apiResults});
        }
      });
});


// 404 erro route
app.get('*', (req, res, next) => {
  res.render('404');
});





app.listen(3000, () => {
  console.log("The app is running on port 3000");
});
