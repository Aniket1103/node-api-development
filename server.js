const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello Node API");
})

app.get("/blog", (req, res) => {
    res.send("Hello this is blog page.");
})

mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://admin:admin123@nodeapi.vadm5t0.mongodb.net/Node-API-dev?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log("Node API app is running on port 3000");
    })
})
.catch((error) => {
    console.log(error);
})