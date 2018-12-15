var express = require('express'); //express
var app = express();

const port = process.env.PORT || 8000;

app.get('/', function (req, res) {
      console.log("racine");
  
})
.listen(port,  '0.0.0.0', () => {
    console.log("App is running on port " + port);
});