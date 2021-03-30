const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9n4k9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });





const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))





client.connect(err => {
  const collection = client.db("volunteer").collection("volunteerCollection");

app.get('/event',(req, res)=>{
  collection.find({})
  .toArray((err, items) =>{
    res.send(items)
    console.log(items)
  })
})

  app.post('/addEvent',(req, res) => {
    const newEvent = req.body;
    console.log('hello new event',newEvent)
    collection.insertOne(newEvent)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })
 console.log('Hello')
});






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(5000)