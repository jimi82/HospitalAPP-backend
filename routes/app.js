// Requires
var express = require('express');

// Init variables
var app = express();

// routes
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        message: 'Successful request'
    });
});

module.exports = app;