const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

admin.initializeApp();

// FUENTE https://medium.com/@edigleyssonsilva/cloud-functions-for-firebase-sending-e-mail-1f2631d1022e

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'a53bcn@gmail.com',
        pass: 'Dulcinea2010'
    }
});



exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: 'Ariel Cima <yourgmailaccount@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Welcome to Barcelona', // email subject
            html: 
                `<p style="font-size: 16px;">Dear ${jammerName},</p>
                <br />
                <p>Thank you very much for your booking in ${jamName}</p>
                <p>Note that we use JAMMINT as a way to manage our bookings and communicate with ur guest.</p>
                <br />
                <p>The next step is to prepare your rent contract, please click in the following link in order to acces our registration form:</p>
                <br />
                <p>${registrationURL}</p>
                <br />
                <p>Thank you very much</p>
                <br />
                <p>Ariel Cima</p>
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
}); 
// https://us-central1-jammint2-6a409.cloudfunctions.net/sendMail
// To execute our function we just have the call with the dest parameter in the URL For example:
// https://us-central1-byte-girl.cloudfunctions.net/sendMail?dest=someemail@teste.com.





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



// ALTERNATIVA: EL MAIL SE ENVIA CADA VEZ QUE SE REGISTRA UN DOC EN UNA COLLECTION
// source: https://softauthor.com/firebase-functions-send-email

var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'a53bcn@gmail.com',
        pass: 'Dulcinea2010'
    }
});

exports.sendRegistrationEmail = functions.firestore
.document('preBookings/{preBookingId}')
.onCreate((snap, context) => {   // I want this function to be fired when a document is created, so I am using onCreate() method. You can use onUpdate, onDelete or onWrite as well. 
    const mailOptions = {
        from: `a53bcn@gmail.com`,
        to: snap.data().jammerEmail,
        subject: 'Welcome to Barcelona',
        html: `
            <h1>Dear ${jammerName},</h1>
            <p>Thank you very much for your booking in ${jamName}</p>
            <p>Note that we use <span>jammint</span> as a way to manage our bookings and communicate with ur guest.</p>
            <br />
            <br />
            <h1>This is your booking information:</h1>
            <h4>room Nr: ${roomNr}</h4>
            <h4>Check-in: ${checkIn}</h4>
            <h4>Check-out: ${checkOut}</h4>
            <h4>Rent [€/Mo]: ${rent}</h4>
            <h4>Deposit [€]: ${deposit}, </h4>
            <p>The next step is to prepare your rent contract, please click in the following link in order to acces our registration form:</p>
            <br />
            <p>${registrationURL}</p>
            <br />
            <p>Ariel Cima</p>
        `  // One thing worth pointing out here is that the snap.data() has information about the newly added document.
    };
    return transport.sendRegistrationEmail(mailOptions, (error, data) => {
        console.log('send email launched')
        if (error) {
            console.log(error)
            return
        }
        console.log("Sent!")
    });
});
        