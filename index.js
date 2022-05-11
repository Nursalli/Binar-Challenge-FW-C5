//Import Module
//Local Module
const { listUsers, findUser, duplicate, addUser } = require('./utils/management-user');
const { router } = require('./router/router');

//Third-Party Module
const express =  require('express');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');

//Init Express and assignment Const Port
const app = express();
const port = 3000;

//Set View Engine EJS
app.set('view engine', 'ejs');

//Built-in Middleware (For Read Public Directory, JSON File and Parsing x-www-urlencoded)
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

//Router Level Middleware (For Login)
app.use(router);

//Third-Party Middleware (For logger and Layouts)
app.use(morgan('dev'));

//Routing Get Users
app.get('/api/getUsers', (req, res) => {
    const users = listUsers();
    res.status(200).json(users);
});

//Routing Get Find User by Id
app.get('/api/getUsers/:id', (req, res) => {
    const user = findUser(req.params.id);
    
    if(user){
        res.status(200).json(user);
    }else{
        res.status(400).json({ 
            errors: 'User Not Found' 
        });
    }
});

//Routing Add User
app.post('/api/addUser', 
    [
        body('email').custom((data) => {
            const check = duplicate(data);
            if(check){
                throw new Error('Email Already Exists');
            }else{
                return true;
            }
        }),
        body('email').isEmail(),
        body('password').isLength({ min: 5})
    ], 
    (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ 
            errors: errors.array() 
        });
    }else{
        addUser(req.body);
        res.status(200).json({ 
            success: 'Data User Saved'
        });
    }
});

//Routing C3 Index
app.get('/c3', (req, res) => {
    res.render('c3/index', {
        title: "Landing Pages",
    });
});

//Routing C4 Index
app.get('/c4', (req, res) => {
    res.render('c4/index', {
        title: "Rock Paper Scissors",
    });
});

//Routing C4 Game
app.get('/c4/game', (req, res) => {
    res.render('c4/game', {
        title: "Rock Paper Scissors",
    });
});

//Middleware Error (404 Handler)
app.use((req, res, next) => {
    res.status(404).json({
        errors: "API Not Found"
    });
});

//Start Server
app.listen(port, () => {
    console.log(`Server sedang aktif di port ${port}`);
});