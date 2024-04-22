const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/vishwaracers"
const connectToMongo = async() => {
     mongoose.set('strictQuery', false);
  
    return mongoose.connect(mongoURI)
      .then(() => {
        console.log('Mongo connected successfully');
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
  };
module.exports = connectToMongo;