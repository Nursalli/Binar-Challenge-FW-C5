//Import Module
//Local Module
const { authentication } = require('../utils/authentication');

//Third-Party Module
const express = require('express');
const { body, validationResult } = require('express-validator');

//Init Express Router
const router = express.Router();

router.use((req, res, next) => {
    console.log('Check Session Login');
    // res.redirect('/home');
    next();
});

router.post('/api/login', 
    [
        body('email').isEmail(),
        body('password').notEmpty()
    ],
    (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({
            errors: errors.array()
        });
    }else{
        const auth = authentication(req.body);

        if(auth){
            res.status(200).json({
                success: 'Login Success'
            });
        }else{
            res.status(400).json({
                errors: 'Login Invalid'
            });
        }
    }
});

module.exports = { router }