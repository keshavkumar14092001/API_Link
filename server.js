require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Sample = require('./models/Sample');
let bodyParser = require('body-parser');
let JSONParser = bodyParser.json();
const PORT = process.env.PORT || 5000;

// Connecting to the DataBase:
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('***DB Connected***');
})


// For Inserting the Data to the MONGODB:
// const newSample = new Sample({
//     _id: new mongoose.Types.ObjectId(),
//     firstname: 'Keshav',
//     lastname: 'Kumar',
//     discription: 'Hello my name is Keshav Kumar',
//     profileImg: 'https://source.unsplash.com/random'
// });
// newSample.save().then((result) => {
//     console.log('New Data Added');
// }).catch((err) => {
//     console.log('Something went Wrong');
// })


// Fetching Data to Node:
// Sample.find({}, (err, datas) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(datas)
//     }
// })

// Making API Routes:
app.get('/samples', (req, res) => {
    Sample.find().then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

app.post('/sample', JSONParser, (req, res) => {
    const newSample = new Sample({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        discription: req.body.discription,
        profileImg: req.body.profileImg
    });
    newSample.save().then((result) => {
        res.status(201).json(result)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

// Listening to PORT:
app.listen(PORT, () => {
    console.log(`The Server is running at PORT ${PORT}`);
})