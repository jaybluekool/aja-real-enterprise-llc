require("dotenv").config();
const express      = require('express');
const app          = express();
const PORT         = process.env.PORT || 3000;
const bodyParser   = require('body-parser');
const path         = require('path');
const mongoClient  = require('mongodb').MongoClient;
const assert       = require('assert');
const url          = 'mongodb+srv://arthurm:' + process.env.MONGODB_PW + '@cluster0.tlhxezq.mongodb.net/?retryWrites=true&w=majority:27017';
const dbName       = 'products';
const client       = new mongoClient(url); 
var _              = require ("lodash");
//const filePath   = (path.join(__dirname) + '/API-Key.txt');  
//const fs         = require("fs");
//var   APIKey     = ''; 
//const https      = require('https');
//const url        = require('url');
//const cors       = require('cors');
//const request    = require('request');

//const corsOptions = {
//  origin: '*'
//}
const options = {
    root: path.join(__dirname)
};
client.connect(function(err) {
    assert.equal(null, err);
    if (!err) {
       console.log('Successfully connected to MongoDb server');
    }
    else {
       console.log("Failed to connect to MongoDb: " + err); 
    }
    const db = client.db(dbName);
    const collection = db.collection('products');
    collection.insertOne({ID: 2, name: "Pencil", price: .80});
    assert.equal(null, err);
    console.log('Successfully added to products DB');
    callback(result);
    client.close();
});
app.listen(PORT, function()
    {console.log('New connection... ' + PORT)});
    
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //APIKey = fs.readFileSync(filePath, {
  //  encoding: 'utf-8',
  //});
  next();  // <-- next function in the pipeline
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

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
        //var substr = login.substring(0, 4);
        var login = _.lowerCase(req.body.login);
        //var login = req.body.login;
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
        //console.log("APIKey before call: " + process.env.API_KEY);
        //const serverConfig = {
        // apiKey: APIKey,
        // server: "us10",   
        //}
        //console.log("serverConfig before call: " + process.env.API_KEY);

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
            apiKey: process.env.API_KEY,
            server: "us10",
        }); 

        const run = async () => {
            const response = await client.lists.getAllLists();
            console.log(response);
            
        };

        run();
        //console.log("Used Read APIKey " + process.env.API_KEY);
        if (res.statusCode === 200) {
            var fileName = 'success.html';
        } else { 
            var fileName = 'Error.html';  
        };
        res.render("list", {custName: custname})
        //res.sendFile(fileName, options, function (err) {
        //if (err) {
        //    next(err);
        //} else {
        //     console.log('Sent:', fileName);
        //}
        //});
        
    });