// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Init variables
var app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import routes
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');


// Data Base connection
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Mongo DB running on port 27017: \x1b[32m%s\x1b[0m', 'online');

});

// Routes
app.use('/', appRoutes);
app.use('/user', userRoutes);
app.use('/login', loginRoutes);

// Listen requestes 
app.listen(3000, () => {
    console.log('Express Server running on port 3000: \x1b[32m%s\x1b[0m', 'online');
});