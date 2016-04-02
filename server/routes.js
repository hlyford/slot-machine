var path = require('path');
var bodyParser = require('body-parser');

module.exports = function (app, express) {

  app.set('views', path.join(__dirname, "/../client"));  
  app.set('view engine', 'html');
  app.use(express.static(path.join(__dirname, "/../client")));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));  

  console.log("Serving up client assets from: ", (path.join(__dirname, "/../client")));
}