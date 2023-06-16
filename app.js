const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merged_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]

    }

    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    // Mailchimp API code
    const url = "https://us8.api.mailchimp.com/3.0/lists/57ad2f2c73";

    const mailChimpApi = process.env.MAILCHIMP_APIKEY;
    const options = {
        method: "POST",
        auth: mailChimpApi
    }
    const request = https.request(url, options, function (response) {
        const statusCode = response.statusCode;
        if (statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
            console.log(statusCode);
            if (statusCode == 200) {
                res.sendFile(__dirname + "/success.html")
            }
        })
    })
    request.write(jsonData);
    request.end();



})

// On failure redirect to home route
app.post("/failure", function (req, res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3010, function () {
    console.log("server running on port 3000")
})

//mailchimp api key
//efe42a7a241d1af02c003a92d12ebbaa-us8

//listId
//57ad2f2c73