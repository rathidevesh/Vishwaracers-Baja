const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();


const app = express()
const port = 5000



app.use(cors())

app.use(express.json())
app.use('/api/auth',require('./routes/auth'))

app.use('/api/rent',require('./routes/rent'))

app.use('/api/blog', require('./routes/blog'));
app.use('/api/team', require('./routes/team'));
app.use('/api/Bookingsroute',require('./routes/Bookingsroute'));
app.use('/api/contact', require('./routes/contact'));

// app.use('/api/Bookingsroute',require('./routes/Bookingsroute'))

app.listen(port, () => {
  console.log(`Vishwaracers listening on port ${port}`)
})