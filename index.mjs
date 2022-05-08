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
    res.render('index');
});

//Start Server
app.listen(port, () => {
    console.log(`Server sedang aktif di port ${port}`);
});