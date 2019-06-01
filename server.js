// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function (req, res) {
  let now = new Date();
  let unix = now.getTime();
  let utc = now.toUTCString()
  res.json({
    "unix":unix,
    "utc":utc
  });
});

app.get("/api/timestamp/:date_string", function (req, res) {
  let date_string = req.params.date_string;
  try{
    if(date_string.match(/^\d+$/)){
      let time = new Date(parseInt(date_string))
      res.json({
        "unix":time.getTime(),
        "utc":time.toUTCString()
      })
    }else if(date_string.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)){
      let unix = Date.parse(date_string);
      let utc = new Date(unix).toUTCString()
      res.json({
        "unix":unix,
        "utc":utc
      })
    }else {
      throw new Error("no valid date_string");
    }
  }catch(err){
    res.json({"error" : "Invalid Date" })
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});