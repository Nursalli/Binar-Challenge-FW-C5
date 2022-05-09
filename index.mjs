//Import Module

//Third-Party Module
import express from "express";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";

//Init Express and assignment Const Port
const app = express();
const port = 3000;

//Set View Engine EJS
app.set('view engine', 'ejs');

//Built-in Middleware (For Read Public Directory, JSON File and Parsing x-www-urlencoded)
app.use(express.static('public'));
// app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

//Third-Party Middleware (For logger and Layouts)
app.use(morgan('dev'));
app.use(expressLayouts);

//Router

//Routing
app.get('/', (req, res) => {
    res.status(200).render('fe/index', {
        title: "Login",
        name: "Muhammad Nursalli",
        year: new Date().getFullYear(),
        layout: 'fe/layout/login-register-layout'
    });
});

//Routing C3 Index
app.get('/c3', (req, res) => {
    res.status(200).render('c3/index', {
        title: "Landing Pages",
        layout: false
    });
});

//Routing C4 Index
app.get('/c4', (req, res) => {
    res.status(200).render('c4/index', {
        title: "Rock Paper Scissors",
        layout: false
    });
});

//Routing C4 Game
app.get('/c4/game', (req, res) => {
    res.status(200).render('c4/game', {
        title: "Rock Paper Scissors",
        layout: false
    });
});

//Start Server
app.listen(port, () => {
    console.log(`Server sedang aktif di port ${port}`);
});