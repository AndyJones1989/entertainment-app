const express = require('express');
const router = express.Router();

router.post('/postEvent', (req, res, next) => {
    console.log(req.body);

const {name, town, description, contact} = req.body;


});

module.exports = router;