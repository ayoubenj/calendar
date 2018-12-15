var express = require('express'); //express
var app = express();
var port = process.env.PORT || 8080;
var address = process.env.IP || '192.168.1.46';

app.get('/', function (req, res) {
      console.log("racine");
  
})
.listen(port, address, () => {
  console.log("Server running on port 5000 s ");
});