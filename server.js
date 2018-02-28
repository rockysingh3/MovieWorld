const express = require('express');
const app = express();
const request = require('request');

app.set("view engine", "ejs");







app.get("/", (req, res) => {
  res.render("index");
});



// makes the request to the api
app.get('/home', (req, res) => {
    let query = req.query.search;
    let urlWithoutId = "http://www.omdbapi.com/?s=" + query + "&plot=true&&apikey=c3090b9a";
    request(urlWithoutId, (error, response, body) => {
      if(!error && response.statusCode == 200){
        let apiResults = JSON.parse(body);
        //console.log(apiResults);
          res.render("home", {data: apiResults});
        }
      });
});






app.listen(3000, () => {
  console.log("The app is running on port 3000");
});
