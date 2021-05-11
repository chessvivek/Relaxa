const express = require("express");
const User = require("./models/User");
const Algorithmia = require('algorithmia');

const fs = require("fs");
const pngToJpeg = require('png-to-jpeg');
const imageToBase64 = require('image-to-base64');

const router = express.Router();

/********************************************/
/************ GET METHODS ***********/
/********************************************/

// Get the user stress level using its _id
router.post("/user/stress_level/", async(req, res) => {
    console.log(req.params.user_id);
    const user = await User.findOne({
        _id: req.body.user_id,
    });
    console.log(user);

    res.send({
        "stress_level": user.stress_level
    });
});

/********************************************/
/************ POST METHODS ***********/
/********************************************/

// Add and analyse a frame
router.post("/frame", async(req, res) => {

    // image is base_64 encoded
    image_png_base64 = req.body.image;
    user_id = req.body.user_id;
    console.log(image_png_base64);

    var image;

    const buffer = new Buffer(image_png_base64.split(/,\s*/)[1],'base64');
    pngToJpeg({quality: 90})(buffer)
    .then((output) => fs.writeFileSync("temp.jpeg", output))
    .then(async () => {

        var bitmap = fs.readFileSync("temp.jpeg");

        // convert binary data to base64 encoded string
        var image_jpeg_base64 = new Buffer(bitmap).toString('base64');

        var prefix = "data:image/jpeg;base64,";
        image = prefix.concat(image_jpeg_base64);
        console.log("new jpeg base64 image:");
        console.log(image);
        
        // imageToBase64("temp.jpeg") // Path to the image
        // .then(
        //     (response) => {
        //         console.log("new jpeg base64 image:");
        //         console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
        //         image = response;
        //     }
        // )
    })
    .then(async () => {

        // Call the external API for facial emotion analysis
        const apiKey = "simyGsFPViAWdveSozg2nVw1+Xr1";
        var input = {
            "image": image,
            "numResults": 7,
        };

        Algorithmia
        .client(apiKey)
        .algo("deeplearning/EmotionRecognitionCNNMBP/1.0.1?timeout=600") // timeout is optional
        .pipe(input)
        .then(async function(response) {
            response = response.get();
            console.log(response);

            var stress_level = 0;

            if (response["results"].length !== 0) {

                // Calculate the stress level
                const emotions_to_average = ["Anger", "Sad", "Disgust", "Fear", "Surprise"];

                var sum = 0, count = 0; 
                emotions = response["results"][0]["emotions"]

                console.log(emotions);

                var current_max = 0;

                for (var i = 0; i < emotions.length; i++) {
                    emotion = emotions[i]["label"];
                    confidence = emotions[i]["confidence"];

                    var to_sum = emotions_to_average.find(function (element) {
                        return element === emotion;
                    });

                    if (to_sum) {
                        if (confidence > current_max) {
                            current_max = confidence;
                        }
                    }
                }
                stress_level = current_max;
            }

            console.log(stress_level);
            
            // Find the user using user_id
            const user = await User.findOne({
                _id: user_id,
            });

            // Update its stress level array
            user.stress_level.push(stress_level);
            user.save();

            res.send({
                "stress_level": stress_level,
            });
        });    
    });
});

// Add a user using name, email, and password
router.post("/register", async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    await user.save();

    res.send(user);
});

module.exports = router;

// "Get" a user using email and password for login
router.post("/login", async(req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    console.log("user");
    console.log(user);
    console.log(req.body.email);
    console.log(req.body.password);
    res.send(user);
});