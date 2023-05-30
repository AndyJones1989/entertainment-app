require('dotenv').config();
const express = require ('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next)=>{
    console.log('some fool be talkin');
    res.header('Access-Control-Allow-Methods', "POST, GET, OPTIONS, DELETE, PUT");
    next();
})

app.options('/', (req, res, next)=>{
    console.log('useRoute');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Headers, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, append,delete,entries,foreach,get,has,keys,set,values,Authorization");
    res.status(200).send();
})
app.use(bodyParser.json());

app.post('/login', (req, res, next) => {
    console.log(req.body);
    const { body } = req;
    const { email } = body.user;
    const { password } = body.user;

    const username='andy@andy.com';
    const passwordTest='1';

    if(email === username && password === passwordTest) { 
        jwt.sign({email}, process.env.JWT_KEY, { expiresIn: '3h' },(err, token) => {
            if(err) { console.log(err) }    
            res.send(token);
        });
    } else {
        res.status(403).send('Invalid User');
    }
})

app.listen(process.env.PORT || 3001, ()=> {console.log("App is available on http://localhost:3001")});