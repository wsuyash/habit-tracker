// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Port
const port = process.env.PORT || 8000;

const app = express();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body parser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes'));

app.listen(port, (req, res) => {
  console.log(`Server started on port: ${port}`);	
});
