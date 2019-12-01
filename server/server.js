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

const session = require("express-session");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.use(session({
    secret: 'thisIsAStrongerSecret', // create your own secret and read it from the file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


// app.get("/setsessionvariable", (req, res) => { // the session will be embedded in the req
//     req.session.user = { name: "Ioana" };
//     res.send("session saved");
// });

// app.get("/getsessionvariable", (req, res) => {
//     res.send(req.session.user);
// });



MongoClient.connect(url, (error, client) => {    
    const db = client.db(dbname);
    sentEmailsCollection = db.collection(collectionName);
    // client.close();
});


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ioanav3796@gmail.com', // TODO: CHANGE THIS
      pass: '' // TODO: CHANGE THIS
    }
});


// SEND EMAIL ENDPOINT
app.post("/send-email", (req, res) => {

    let mailOptions = {
        from: 'ioanav3796@gmail.com', // TODO: Change it dynamically based on google login
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.message, // text or html
    };

    // EXPRESS SESSION
    // req.session.user = { userEmail: 'ioanav3796@gmail.com' };

    let mailOptionsWithDate = mailOptions;
    mailOptionsWithDate['dateSent'] = new Date();
    console.log(new Date());

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
    console.log("session here", req.session.user)

    // EXPRESS SESSION 

    // if (Object.keys(req.session.user).length) {
    //     sentEmailsCollection.find().sort( { _id: -1 } ).toArray((error, sent) => {
    //         res.send(sent);
    //     });
    // } else {
    //     res.status(401).send("User shall not pass");
    // }

    sentEmailsCollection.find().sort( { _id: -1 } ).toArray((error, sent) => {
        res.send(sent);
    });
});


const server = app.listen(8080, (error) => {
    if (error) {
        console.log("Error running the server ", error);
    }
    console.log("The server is running on port ", server.address().port);
});
