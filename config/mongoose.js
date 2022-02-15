const mongoose = require('mongoose'); // Import mongoose

mongoose.connect('mongodb+srv://suyash:suyash123@cluster0.mmzvk.mongodb.net/habitTracker?retryWrites=true&w=majority'); // Connect to MongoDB on MongoDB Atlas

const db = mongoose.connection; // Create a variable to store the connection

db.on('error', () => { console.error('Error in connecting to the DB.') }); // If there is an error in connecting to the DB, log it to the console

db.once('open', () => { console.log('Succesfully connected to the DB.') }); // If the connection is successful, log it to the console

module.exports = db; // Export the connection
