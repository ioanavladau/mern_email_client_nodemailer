const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbname = "emails";
const collectionName = "sent";
let sentEmailsCollection = "";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

MongoClient.connect(url, (error, client) => {    
    const db = client.db(dbname);
    sentEmailsCollection = db.collection(collectionName);
    // client.close();
});


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '', // TODO: CHANGE THIS
      pass: '' // TODO: CHANGE THIS
    }
});


// SEND EMAIL ENDPOINT
app.post("/send-email", (req, res) => {

    // const sentEmail = {
    //     "sendTo": "ioana@ioana.com",
    //     "subject": "Subject here",
    //     "body": "Body here",
    // };

    let mailOptions = {
        from: 'ioanav3796@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
      //   text: `Hi Ioana, nice to see it's working`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    sentEmailsCollection.insertOne(mailOptions, (error, result) => {
        res.send(result);
    });
});

// VIEW SENT EMAILS ENDPOINT
app.get("/sent-emails", (req, res) => {
    sentEmailsCollection.find().toArray((error, sent) => {
        res.send(sent);
    });
});


const server = app.listen(8080, (error) => {
    if (error) {
        console.log("Error running the server ", error);
    }
    console.log("The server is running on port ", server.address().port);
});
