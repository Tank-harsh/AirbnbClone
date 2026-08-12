const express = require("express");
const router = express.Router();

const ExpressError = require("../util/ExpressError.js");
const WrapAsync = require("../util/WrapAsync.js");
const listing = require("../models/listing.js");
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");

const listingcontroller = require("../controller/listings.js");

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// Index Route
router.get("/", WrapAsync(listingcontroller.index));

//new route
router.get("/new", isLoggedIn, listingcontroller.rendernewform);

// Filter Route (API - returns JSON) - MUST be before /:id
router.get("/filter", WrapAsync(listingcontroller.filterListings));

//Show Route
router.get("/:id", WrapAsync(listingcontroller.showroute));


//create route
router.post(
  "/",
  upload.single("listing[image]"),
  validateListing,
  WrapAsync(listingcontroller.createListing),
);

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  WrapAsync(listingcontroller.editListing),
);

//update route
//here put use to change whole filed,and patch use one field
router.put(
  "/:id",
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  WrapAsync(listingcontroller.updateListing),
);

//delete route
router.delete(
  "/:id",
  isOwner,
  isLoggedIn,
  WrapAsync(listingcontroller.deleteListing),
);

module.exports = router;
