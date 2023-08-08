const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// ----------------------------------------------------------
let cors = require('cors');
app.use(cors());
// ----------------------------------------------------------
app.post("/send", function (req, res) {
    console.log(req.body);
    if (!req.body.to || req.body.to.length < 5 ||
        !req.body.to || req.body.subject.length < 2 ||
        !req.body.message || req.body.message.length < 2) {
        res.json({
            status: false,
            message: "Your Data Not Valid!"
        });
    } else {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'abolfazl.tabe95@gmail.com',
                pass: 'lcdamxykwxoeokgl'
            }
        });

        let mailOptions = {
            from: 'abolfazl.tabe95@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({
                    status: false,
                    message: "We Are Can't Send Your Email Please Try Again."
                })
            } else {
                res.json({
                    status: true,
                    message: "Your Email Sent SuccessFully."
                });
            }
        });
    }

})

// ----------------------------------------------------------

app.use((req, res) => {
    res.json({
        status: false,
        message: "This route is not in my api"
    });
});



app.listen(4000);