const express      = require('express');
//const request    = require('request');
const https        = require('https');
const app          = express();
const PORT         = process.env.PORT || 3000;
const url          = require('url');
//const bodyParser = require('body-parser');
const path         = require('path');
app.listen(PORT, function()
    {console.log('New connection... ' + PORT)});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();  // <-- next function in the pipeline
});

//app.use(bodyParser.urlencoded({extended: true}));

app.get('/register', function(req, res)
    {
        var options = {
            root: path.join(__dirname)
        };
         
        var fileName = 'register.html';
        res.sendFile(fileName, options, function (err) {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', fileName);
            }
        });
    });
    
app.get('/', function(req, res)
    {
        return  res.sendStatus(res.statusCode);       
    });

app.post('/register', function(req, res)
    {
        var URL = url.parse(req.url, true);
        //console.log(URL.query.uname);
        return  res.send("true");       
    });