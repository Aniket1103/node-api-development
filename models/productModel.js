const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        "name" : {
            "type" : String,
            "required" : [true, "Please Enter a name."]
        },
        "quantity" : {
            "type" : Number,
            "required" : true
        },
        "price" : {
            "type" : Number,
            "required" : true
        },
        "image" : {
            "type" : String,
            "required" : false
        }
    },
    {
        timeStamps : true
    }
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;