const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: {
            type: String,
            required: true,
            default: "https://unsplash.com/photos/wilted-tree-during-daytime-zThTy8rPPsY",
        }
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
})

listingSchema.post("findOneandDelete",async (req,res)=>{
    if(listing){
          await Review.deleteMany({reviews : {$in: listing.reviews }});
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
