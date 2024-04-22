const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Blog = require("../models/Blog");
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
router.post('/add-blog', fetchuser, upload.array('images', 10), async (req, res) => {
    try {
        const { name, description} = req.body;
        // const user = req.user.id; 
        const images = (req.files && req.files.length > 0) ? req.files.map(file => file.filename) : []; 

        let data = new Blog({ name, description,  images});
        let response = await data.save();
        res.status(200).json({ message: 'Blog Added Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/allblog' ,  async(req,res)=>{
    try{
        const blog = await Blog.find()
        res.json(blog)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/blogs/:id', async (req, res) => { // Add :id parameter
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router