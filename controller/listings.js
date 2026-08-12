const listing = require("../models/listing.js");
const mapToken=process.env.MAP_API_TOKEN;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');  
const GeocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index = async (req, res) => {
 
 const {search} = req.query;
/*for search listings implementation*/
let alllistings;
if (search) {
  alllistings = await listing.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
    ],
  });
} else {
  alllistings = await listing.find({});
}
  res.render("listings/home.ejs", { alllistings });
};

module.exports.filterListings = async (req, res) => {
  const { filter } = req.query;
  let alllistings;
  if (filter) {
    alllistings = await listing.find({ category: filter });
  } else {
    alllistings = await listing.find({});
  }
  res.json(alllistings);
};


module.exports.rendernewform = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showroute = async (req, res) => {
  let { id } = req.params;
  const Listing = await listing
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "AuthorBy",
      },
    })
    .populate("owner");

  if (!Listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { Listing });
};



module.exports.createListing = async (req, res) => {


/*  for map geocoding */
let responce = await GeocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListings = new listing(req.body.listing);
  newListings.owner = req.user._id;
  newListings.image = { url, filename };
  newListings.geometry=responce.body.features[0].geometry;
  let check=await newListings.save();
  console.log(check);
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};  




module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findById(id);
  if (!Listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  let OriginalImageUrl =  Listing.image.url;
  OriginalImageUrl = OriginalImageUrl.replace("/upload","/upload/ar_1.0,c_fill,h_250/bo_5px_solid_lightblue");
  req.flash("success", " Listing Updated");
  res.render("listings/update.ejs", { Listing , OriginalImageUrl});
};



module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
let responce = await GeocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send();

  let Listing = await listing.findByIdAndUpdate(id, { ...req.body.listing});

  if (req.file !== undefined) {
    let url = req.file.path;
    let filename = req.file.filename;
    Listing.image = { url, filename };
   
    await Listing.save();
  }
    Listing.geometry=responce.body.features[0].geometry;
    
  await Listing.save();

  if (!Listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};



module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  
  let deletedListing = await listing.findByIdAndDelete(id);
  if (!deletedListing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
  console.log("delete successful");
};
