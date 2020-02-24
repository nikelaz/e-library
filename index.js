const express = require('express');
const config = require('./config.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const viewController = require('./src/controllers/viewController');
const userController = require('./src/controllers/userController');

// Initialize Express
global.app = express();

// Establish DB Connection
mongoose.connect(`mongodb://ds155299.mlab.com:55299/e-library`, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: config.db.user,
    password: config.db.pass
  },
});

// Initialize Middleware
app.use(express.static('./dist'));
app.use(bodyParser.json());

// Initialize Controllers
viewController();
userController();

app.listen(config.port);

console.log(`Listening on port ${config.port}..`);
console.log(`http://localhost:${config.port}`);
