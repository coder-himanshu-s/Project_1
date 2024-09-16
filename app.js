const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");

const MONGO_URL = 'mongodb://localhost:27017/wanderlust';
async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("connected to db");
}).catch((err) =>{
    console.log(err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req,res) =>{
    res.send("hi i am root ");
});

// app.get("/testlisting",  async (req,res) =>{
//   let sampleListing = new Listing({
//      title:"My new title",
//      description: " by the beach",
//      price: 1200,
//      location: "Calangute Goa",
//      country: "India"

//   });
  
//    await sampleListing.save();
//    console.log("sample was saved");
//    res.send("successful testing");
// });

// Index route
app.get("/listings" , async (req,res) =>{
    // console.log("Fetching listings...");
     const allListings =  await Listing.find({});
    res.render("listings/index.ejs" ,{ allListings });
});

// New Route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs", );
});

// Create route
app.post("/listings", async (req,res)=>{
    // Methid 1 for extracting data    let { title,description,image,price ,country,location} = req.body;
    // MEthod 2 using listing[title] in ejs file
    // let listing = req.body.listing;
    // console.log(listing);
   const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
    // console.log(listing);
});

// Edit Route
app.get("/listings/:id/edit", async (req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing})
});

// Update route
app.put("/listings/:id", async (req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});
// Show route
app.get("/listings/:id", async (req,res) =>{
     
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

// Delete Route
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    let deletedListing =  await  Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});


app.listen(8080, ()=>{
    console.log("Server is listening on port 8080");
});
