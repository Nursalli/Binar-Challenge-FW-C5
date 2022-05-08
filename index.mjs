//Import Module

//Third-Party Module
import express from "express";
import morgan from "morgan";

//Init Express and assignment Const Port
const app = express();
const port = 3000;

//Set View Engine EJS
app.set('view engine', 'ejs');

//Built-in Middleware (For Read Public Directory and Parsing x-www-urlencoded)
app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));

//Third-Party Middleware (For logger)
app.use(morgan('dev'));

//Routing
app.get('/', (req, res) => {
    res.status(200).render('index');
});

//Routing C3 Index
app.get('/c3', (req, res) => {
    res.status(200).render('c3/index');
});

//Routing C4 Index
app.get('/c4', (req, res) => {
    res.status(200).render('c4/index');
});

//Routing C4 Game
app.get('/c4/game', (req, res) => {
    res.status(200).render('c4/game');
});

//Start Server
app.listen(port, () => {
    console.log(`Server sedang aktif di port ${port}`);
});