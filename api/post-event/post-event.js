const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/post-event/auth', (req, res, next) => {
    console.log(req.body);

    const user='andy@andy.com';
    const passwordTest='1';

    const {token} = req.body;

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        console.log(decoded);
    })

    // if(email === username && password === passwordTest) { 
    //     jwt.sign({email}, process.env.JWT_KEY, { expiresIn: '3h' },(err, token) => {
    //         if(err) { console.log(err) }    
    //         res.send(token);
    //     });
    // } else {
    //     res.status(403).send('Invalid User');
    // }
});

module.exports = router;