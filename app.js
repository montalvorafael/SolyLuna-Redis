var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var cors = require('cors');

var habitacionesRouter = require('./routes/habitaciones');
var usuariosRouter = require('./routes/usuarios');

var app = express();

//Middlewares.
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/habitaciones', habitacionesRouter);
app.use('/api/usuarios', usuariosRouter);

module.exports = app;
