const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
var fetchuser = require('../middleware/fetchUser');

router.post("/bookcar" ,  fetchuser,async(req,res) => {
    try{
        const newbooking = new Booking(req.body)
        const savedbooking  =  await newbooking.save()
        res.json(savedbooking)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//get all bookings of a user
router.get('/bookings',  fetchuser,async (req, res)=>{
    try{
        const booking = await Booking.find({bookeduser : req. user.id})
        res.json(booking)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/allbookings' , fetchuser , async(req,res)=>{
    try{
        const booking = await Booking.find()
        res.json(booking)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router