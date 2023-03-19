const express = require('express');
//const request = require('request');
const bodyParser = require("body-parser");
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, function()
    {console.log('New connection... ' + PORT)});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();  // <-- next function in the pipeline
});

app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req, res)
    {
        console.log(req.hostname);
        return  res.send(req.body.uname);       
    });