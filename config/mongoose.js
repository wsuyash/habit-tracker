const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://suyash:suyash123@cluster0.mmzvk.mongodb.net/habitTracker?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', () => { console.log('Error in connecting to the DB.') });

db.once('open', () => { console.log('Succesfully connected to the DB.') });

module.exports = db;
