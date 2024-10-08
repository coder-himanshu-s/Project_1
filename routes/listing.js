const express= require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("../schema.js");


const validateListing = (req,res,next) =>{
    
    let {error} = listingSchema.validate(req.body);
    console.log(result);
    if(error) {
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }

}


// Index route
router.get("/" , wrapAsync(async (req,res) =>{
    // console.log("Fetching listings...");
     const allListings =  await Listing.find({});
    res.render("listings/index.ejs" ,{ allListings });
}));

// New Route
router.get("/new", (req,res)=>{
    res.render("listings/new.ejs", );
});

// Create route
router.post("/",validateListing, 
    wrapAsync(async (req,res,next)=>{
    // Methid 1 for extracting data    let { title,description,image,price ,country,location} = req.body;
    // MEthod 2 using listing[title] in ejs file
    // let listing = req.body.listing;
    // console.log(listing);
        // if(!req.body.listing){
        //     throw new ExpressError(400,"Send valid data for listing ");
        // }
       
      
        // if(!newListing.title){
        //     throw new ExpressError(400,"TItle is missing");
        // }
        // if(!newListing.description){
        //     throw new ExpressError(400,"Description is missing");
        // }
        // if(!newListing.location){
        //     throw new ExpressError(400,"Location is missing");
        // }
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
     })
   
    // console.log(listing);
);

// Edit Route
router.get("/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    console.log(listing); // Log the fetched listing
    res.render("listings/edit.ejs", { listing });
});

// Update route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing ");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));


// Show route
router.get("/:id", wrapAsync(async (req,res) =>{
     
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedListing =  await  Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;