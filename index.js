//Import Module
//Local Module
const { listUsers, findUser, duplicate, addUser, updateUser, deleteUser } = require('./utils/management-user');

//Third-Party Module
const express =  require('express');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');

//Init Express and Assignment Const Port
const app = express();
const port = 3000;

//Set View Engine EJS
app.set('view engine', 'ejs');

//Use Middleware
//Built-in Middleware (For Read Public Directory, JSON File and Parsing x-www-urlencoded)
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

//Third-Party Middleware (For logger and Layouts)
app.use(morgan('dev'));

//Router Level Middleware (For Login)
const { router } = require('./router/router');
app.use(router);

//Routing Get, Get Users
app.get('/api/getUsers', (req, res) => {
    const users = listUsers();
    res.status(200).json(users);
});

//Routing Get, Find User by Id
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

//Routing Post, Add User
app.post('/api/addUser', 
    [
        body('email').custom(data => {
            const check = duplicate(data);
            if(check){
                throw new Error('Email Already Exists');
            }else{
                return true;
            }
        }),
        body('email').isEmail(),
        body('name').notEmpty(),
        body('password').isLength({ min: 5})
    ], 
    (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ 
            errors: errors.array() 
        });
    }else{
        addUser(req.body);
        res.status(201).json({ 
            success: 'Data User Saved'
        });
    }
});

//Routing Put, Update User
app.put('/api/updateUser/:id', 
    [
        body('email').custom((data, { req }) => {
            const user = findUser(req.params.id);
            const check = duplicate(data);
            if(user.email !== req.body.email && check){
                throw new Error('Email Already Exists');
            }else{
                return true;
            }
        }),
        body('email').isEmail(),
        body('name').notEmpty(),
        body('password').custom(data => {
            if(data.length !== 0 && data.length < 5){
                throw new Error('Invalid value');
            }else{
                return true;
            }
        })
    ], 
    (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ 
            errors: errors.array() 
        });
    }else{
        updateUser(req.body, req.params.id);
        res.status(200).json({ 
            success: 'Data User Updated'
        });
    }
});

//Routing Delete, Delete User
app.delete('/api/deleteUser/:id', (req,res) => {
    const user = findUser(req.params.id);
    
    if(user){
        deleteUser(req.params.id);
        res.status(200).json({
            success: 'Data User Deleted'
        });
    }else{
        res.status(400).json({ 
            errors: 'User Not Found' 
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

//Example Router for Internal Server Error
app.get('/salah', (req, res) => {
    salah
});

//Error Handling Middleware (Internal Server Error)
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: "Fail",
        errors: err.message
    });
});

//Error Handling Middleware (404 Handler)
app.use((req, res, next) => {
    res.status(404).json({
        errors: "API Not Found"
    });
});

//Start Server
app.listen(port, () => {
    console.log(`Server sedang aktif di port ${port}`);
});