const express      = require('express');
const app          = express();
const PORT         = process.env.PORT || 3000;
const path         = require('path');
const bodyParser   = require('body-parser');
const https        = require('https');
//const url        = require('url');
//const cors = require('cors');
//const request    = require('request');

//const corsOptions = {
//  origin: '*'
//}
const options = {
    root: path.join(__dirname)
};

app.listen(PORT, function()
    {console.log('New connection... ' + PORT)});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();  // <-- next function in the pipeline
});

app.use(bodyParser.urlencoded({extended: true}));

//app.use(cors({origin: '*'}));

//app.use((req, res, next) => {
//  res.header('Access-Control-Allow-Origin', '*');
//  next();  // <-- next function in the pipeline
//});
//const helmet = require('helmet');
// use '*' to allow from anyone
//app.use(helmet({
//  allowFrom: ['*'], 
//  credentials: 'basic',
//  maxAge: 86400000,
//}));

//app.get('/login', cors(corsOptions), (req, res) => {
//    request(
//    { url: 'http://ec2-54-88-12-191.compute-1.amazonaws.com:8080/ajaenterprise/ValidatePwServlet?uname='+req.query.uname+'&password='+req.query.password},
//    (error, response, body) => {
//    if (error || response.statusCode !== 200) {
//      return console.log('Server Error', response.statusCode);
//    }
//          res.setHeader('Access-Control-Allow-Origin', '*'); 
//          res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//    console.log('Server'); 
//    return  res.send(body);
//  })
//  });

app.get('/register', function(req, res)
    {
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

app.post('/register', (req, res, next) => {
        //var URL    = url.parse(req.url, true);
        //console.log(URL.query.uname);
        var login = req.body.login;
        var password = req.body.password;
        var custname = req.body.custname;
        var email = req.body.email;
        var unit = req.body.unit;
        var phone = req.body.phone;
        console.log("Login: " + login);
        console.log("password: " + password);
        console.log("custname: " + custname);
        console.log("email: " + email);
        console.log("unit: " + unit);
        console.log("phone: " + phone);

        const data = {
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merged_fields: {
                        FNAME: custname,
                        LNAME: custname
                    }
                }
            ]
        };
        
        const client = require("@mailchimp/mailchimp_marketing");
        client.setConfig({
            apiKey: "93fdb2d68480853232d588f13c3f76e5",
            server: "us10",
        });

        const run = async () => {
            const response = await client.lists.getAllLists();
            console.log(response);
            
        };

        run();

        if (res.statusCode === 200) {
            var fileName = 'success.html';
        } else { 
            var fileName = 'Error.html';  
        };
        res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
             console.log('Sent:', fileName);
        }
        });
        
    });
        
      
    
//93fdb2d68480853232d588f13c3f76e5-us10 API Key
//f0fbe4e6a0 Audience Id
//curl -sS -X POST "https://mandrillapp.com/api/1.0/users/ping" \
//  --header 'Content-Type: application/json' \
//  --data-raw '{ "key": "YOUR_API_KEY" }'