const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();


app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser('secret'))

app.use('/', require('./router'));

app.listen(2000, ()=>{
    console.log('SERVER corriendo en http://localhost:2000');
});

const session = require('express-session');
const conexion = require('./database/db');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());










