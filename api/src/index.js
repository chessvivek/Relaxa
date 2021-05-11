const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

mongoose.connect(
    "mongodb+srv://caltechhacker:0zZ1QJO3FZVy66VZ@hacktech.a1w11.mongodb.net/Database?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/api", routes);

    app.listen(5000, () => {
        console.log("server running...");
    });
}).catch(err => console.log(err));
