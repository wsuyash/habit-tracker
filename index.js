const express = require('express'); // Import express
const expressLayouts = require('express-ejs-layouts'); // Import the express-ejs-layouts module
const db = require('./config/mongoose'); // Import the database
const path = require('path'); // Import the path module

// Port
const port = process.env.PORT || 8000; // Set the port to 8000 or the port specified in the environment

const app = express(); // Create an express app

// Static files
app.use(express.static(path.join(__dirname, 'public'))); // Set the public folder as the static folder

// EJS
app.use(expressLayouts); // Use the express-ejs-layouts module
app.set('view engine', 'ejs'); // Set the view engine to ejs

// Body parser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes')); // Use the routes

// Start the server
app.listen(port, (req, res) => {
  console.log(`Server started on port: ${port}`);	
});
