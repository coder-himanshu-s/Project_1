const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title: {
        type:  String ,
        required: true,
    },
    description: String ,
    image: {
        filename: String,
        url : { type: String,
        default: "https://unsplash.com/photos/wilted-tree-during-daytime-zThTy8rPPsY" ,
        set: (v) => v === "" ? "https://unsplash.com/photos/wilted-tree-during-daytime-zThTy8rPPsY" 
        : v,}
        
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;