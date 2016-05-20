console.log('Running node app.');
/*---------- BASIC SETUP ----------*/
var fs = require('fs');
var express = require('express'),
    bodyParser = require('body-parser');
var app = express();
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

//Express server
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    // See CORS at https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);  // Show the URL user just hit by user
    next();
});

app.use('/', express.static(__dirname + '/public'));

/*-------------- APP --------------*/

/*----- Reading -----*/


// fs.readFileDir --> Sync
function readFiles(callback){
  var files = fs.readdirSync('public/files/');
  console.log(files);
  callback(files);
}
 

/*----------- RESPOND -------------*/
app.post('/files', 
    function(request, response){
      console.log(request.body);
      var requestedFiles = request.body['files'];  
      readFiles(function(_files){
        if(requestedFiles = 'pics'){
          response.json({
            numberOfPics: _files.length,
            picNames: _files
          });
        }  
      });    
    }
);



/*---------- BASIC SETUP ----------*/
var PORT = 4000;
app.listen(PORT, function(){
  console.log('Express server is running at ' + PORT);
});
/*---------------------------------*/








