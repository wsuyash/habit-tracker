// Imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Port
const port = 8000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes'));

app.listen(port, (req, res) => {
	console.log(`Server started on port: ${port}`);	
});