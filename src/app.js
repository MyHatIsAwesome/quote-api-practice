const express = require('express');
const path = require('path');
const app = express();

const {failure} = require('./util');

// Serve Docs
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// Decode post request body into json
app.use(express.json());

// Serve API Routes
app.use('/api', require('./routes'));

// Handle 404s
app.use('*', function notFoundHandler (req, res, next) {
    res.status(404);
    res.json(failure(404, "Requested path not found"));
});

// Uncaught Exception Handler
app.use(function errorHandler (err, req, res, next) {
    let status = err.status || 500;
    res.status(status).json(failure(status, err.message));
});

app.listen(3500, () => console.log('Quote API listening on port 3500!'));



