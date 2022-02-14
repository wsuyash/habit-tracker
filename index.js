// Imports
const express = require('express');
// const expressSession = require('express-session');
const expressLayouts = require('express-ejs-layouts');
// const flash = require('connect-flash');
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

/* // Express-session
app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// Flash for notifications
app.use(flash());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
}); */

// Routes
app.use('/', require('./routes'));

app.listen(port, (req, res) => {
  console.log(`Server started on port: ${port}`);	
});
