const request = require('request');          //Used for Cat & Dog
const express = require('express');         //Used for webpage set up
const fs = require('fs');                   //Used for finding file
const app = express();
const port = 8765;                          //Port
const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');
const absPath = 'C:\\Users\\Mrfn3\\Documents\\Workspace\\nodetest\\';   //Testing Locally
//const absPath = '/home/students/nadeems/nodetest/';                      //Testing Yoda
     

//This will run on the home page
app.get('/', function(req, res){

    indexFile = absPath + "index.html";
    res.sendFile(indexFile);
    console.log(res.statusCode);   

});

// This Code will run when cat is called

app.get('/cat', function(req,res){

    var options = {

        method: 'GET',
        url: 'https://api.thecatapi.com/v1/images/search?mime_types=png',
        headers: {
            'x-api-key': 'f513c45f-7ac7-492f-b047-5a89438c0563'
        }
    };

    request(options, function(error, response, body){

        if(error){ 
            throw new Error(error);
        }

        console.log("//CAT PICTURE INCOMING//")
        console.log("//Original");
        console.log(body);
        catJSON = JSON.parse(body);
        var catURL = catJSON[0]["url"];
        var catWidth = catJSON[0]["width"];
        var catHeight = catJSON[0]["height"];
        console.log("//JSON FOR CAT//");
        console.log(catJSON);
        console.log("//CAT URL//");
        console.log(catURL);
        res.status(200);

        res.send("<img src='"+catURL+"'>"
            +"<br> <h4> Width: " + catWidth + "</h4>" + 
            "<h4> Height " + catHeight + "</h4>"
        
        );

    });

});

// Dog
app.get('/dog', function(req,res){

    var options = {

        method: 'GET',
        url: 'https://api.thedogapi.com/v1/images/search?mime_types=png',
        headers: {
            'x-api-key': 'f513c45f-7ac7-492f-b047-5a89438c0563'
        }
    };

    request(options, function(error, response, body){

        if(error){ 
            throw new Error(error);
        }

        dogJSON = JSON.parse(body);
        var dogURL = dogJSON[0]["url"];
        var dogWidth = dogJSON[0]["width"];
        var dogHeight = dogJSON[0]["height"];
        console.log("//JSON FOR DOG//");
        console.log(dogJSON);
        console.log("//CAT URL//");
        console.log(dogJSON[0]["breeds"]);
        res.status(200);

        res.send("<img src='"+catURL+"'>"
            +"<br> <h4> Width: " + catWidth + "</h4>" + 
            "<h4> Height " + catHeight + "</h4>"
        
        );

    });

    

});

//MYSQL TEST

app.get('/mysql', function(req, res){

    var con = mysql.createConnection({
        
        host: dbconfig["host"],
        user: dbconfig["user"],
        password: dbconfig["password"],
        database: "2019S_nadeems"

    });

    con.connect(function(err){

        if(err){throw err;}
        console.log("Connected!");
        con.query("SELECT * FROM 2019S_nadeems.products", function(err, result, feilds){

            if(err){throw err;}
            console.log(result);
            res.send(result);

        });

    });

    // con.end();

});

// This code will run when any other webpage is called
app.get('/*', function(req,res){

    var filePath = absPath +  req.originalUrl + '.html';
    if(fs.existsSync(filePath)){
    console.log(fs.existsSync(filePath));
    res.sendFile(filePath);
    console.log(res.statusCode); 
    }else{

        filePath = absPath + '404.html';
        res.status(404);
        res.sendFile(filePath);
        console.log(res.statusCode); 

    }
   

});

app.listen(port, () => console.log('Working at port: ' + port));
