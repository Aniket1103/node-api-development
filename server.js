const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());    //this middleware enables accessing body data passed in JSON format
app.use(express.urlencoded({extended : false}));    //this middleware allows accessing body data passed through form data

app.get("/", (req, res) => {
    res.send("Hello Node API");
})

app.get("/products", async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({products : products});
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})

app.get("/products/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})

app.post("/products", async (req, res) => {
    console.log(req.body);
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})

app.put("/products/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product) {
            res.status(404).json({message : `Cannot find any product with id ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})


app.delete("/products/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            res.status(404).json({message : `Cannot find any product with id ${id}`});
        }
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
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