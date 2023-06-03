const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const Activity = require('./Activity');
// haversine is a mathematical formula for working out crow-flies distances between lat/long points.
const haversine = require('haversine');

router.post('/activities', async (req, res, next) => {
    console.log(req.body);
    const { body } = req;

    const userLocation = {
        latitude: body.lat,
        longitude: body.lon
    }

    mongoose.connect("mongodb+srv://andyjones2:roadkill1@cluster0.wvill0h.mongodb.net/kidsActivities")
    .then(() => {console.log("connection established to MongoDB cluster")})
    .catch((err) => {console.log(err.stack)});

    const sortFunction = (a,b)=>{
        const homeToA = haversine(userLocation, a);
        const homeToB = haversine(userLocation, b);

        if (homeToA < homeToB){
            return -1
        }
        if(homeToA > homeToB){
            return 1
        }
        else return 0
    }

    const activities = await Activity.find()
    const mappedActivities = activities.map((activity)=>{
        return {
            _id: activity.id,
            name: activity.name,
            contact: activity.contact,
            latitude: Number(activity.latitude),
            longitude: Number(activity.longitude),
        }
    })

    mappedActivities.sort(sortFunction);

    res.status(200).send(mappedActivities);
    
});

module.exports = router;