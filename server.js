// Setup empty JS object to act as endpoint for all routes
let projectData = {};

/**
 * INIT SERVER
 */
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server Port
const port = 3000;

// Extras
const ip = require('ip');

// Setup Server
const server = app.listen(port, listening);

/**
 * ROUTES
 */
// Get All Feelings Route
app.get('/all',handleGetAllFeelings);

// Post New Feeling Route
app.post('/addFeelings', handlePostFeeling);


/**
 * CALLBACK FUNCTIONS
 */
// Server callback debug function
function listening() {
  // console.log(`running on localhost: ${port}\n\r`);
  console.log('Website running at:');
  console.log(`  - Local: http://localhost:${port}`);
  console.log(`  - Network: http://${ip.address()}:${port}`);
}

// Get all data callback
function handleGetAllFeelings(req, res) {
  res.send(projectData);
}

// Post new feeling callback
function handlePostFeeling(req, res) {
  // Add new data to the project data
  projectData = {...req.body};
  res.send('Data Received Successfully');
}

