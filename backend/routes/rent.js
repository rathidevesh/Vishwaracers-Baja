const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchUser");
const Car = require("../models/Addcar");
const { body, validationResult } = require("express-validator");

router.post(
    "/addcar",
    fetchuser,
    [
      body("name", "Enter a valid name").isLength({ min: 3 }),
      body("description", "Enter a valid description").isLength({ min: 5 }),
    ],
    async (req, res) => {
      try {
        const { name, description, cost, photo,Used_for  } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const car = new Car({name,description,cost,photo ,Used_for,user:req.user.id});
        const savedCar = await car.save();
        res.json(savedCar);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );

  router.get('/cars/farmer', async (req, res) => {
    try {
      const cars = await Car.find({ Used_for: 'farmer' });
      res.json(cars);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/cars/tourist', async (req, res) => {
    try {
      const cars = await Car.find({ Used_for: 'tourist' });
      res.json(cars);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/allcars',fetchuser,async(req,res)=>{
    try{
      const allCars = await Car.find();
      res.json(allCars);
    }catch(error){
      console.log(error.message);
    }
  });

  module.exports = router;