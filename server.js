var express = require('express'); //express
var app = express();

app.get('/', function (req, res) {
      console.log("racine");
  
})
.listen(5000, '192.168.1.46' , () => {
  console.log("Server running on port 5000");
});