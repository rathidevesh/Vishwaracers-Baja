const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Addteam = require("../models/Teaminfo");
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "_" + file.originalname); // Add the uniqueSuffix before the filename
    }
});

const upload = multer({ storage: storage });

// Route to add team members with images
router.post('/add-team', fetchuser, upload.array('images', 10), async (req, res) => {
    try {
        const { name, position, email, linkedin, insta,domain } = req.body;
        const user = req.user.id; // Assuming you have the user ID in the request
        const images = (req.files && req.files.length > 0) ? req.files.map(file => file.filename) : []; // Array of uploaded image filenames

        let data = new Addteam({ name, position, email, linkedin, insta, images,domain });
        let response = await data.save();
        res.status(200).json({ message: 'Team Member Added Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/display-team', async (req, res) => {
    try {
        
        const teamMembers = await Addteam.find();

        
        res.status(200).json({ teamMembers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/update-team/:id', fetchuser, upload.single('image'), async (req, res) => {
    try {
        const memberId = req.params.id;
        const updates = req.body;
        const existingMember = await Addteam.findById(memberId);

        if (req.file) {
            // Delete the existing images first
            for (let i = 0; i < existingMember.images.length; i++) {
                fs.unlink(`${__dirname}/../../public/images/` + existingMember.images[i], (err) => {
                    if (err) throw err;
                });
            }

            updates.image = req.file.filename;
        } else {
            // If no new image is uploaded, keep the existing image filenames
            updates.image = existingMember.images;
        }

        const updatedMember = await Addteam.findByIdAndUpdate(
            memberId,
            { $set: updates },
            { new: true }
        );
        console.log(updatedMember);
        res.status(200).json({ updatedMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.delete("/deletemember/:id", fetchuser, async (req, res) => {
    try {
      const memberId = req.params.id;
      const deletedMember = await Addteam.findOneAndDelete({ _id: memberId });
      res.status(204).json({ message: "Team Member Deleted Successfully", deletedMember });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router