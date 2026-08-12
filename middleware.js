const { listingSchema, reviewSchema } = require("./schema.js");
const listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./util/ExpressError.js");



//check authenticate user login or not
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
  
    req.flash("error", "You must be  loggedin first in marvel");
    req.session.RedirectUrl = req.originalUrl;
    return res.redirect("/login");
  }
  next();
};


//to redirect the page before i open login page after login
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.RedirectUrl) {
    res.locals.RedirectUrl = req.session.RedirectUrl;
  }
  next();
};


//Listing Validation
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


//Review validation
module.exports.ValidateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


//authorization listings use this middleware
module.exports.isOwner = async (req, res, next) => {
 let { id } = req.params;
   let Listings = await listing.findById(id);
   if (!Listings.owner.equals(res.locals.currUser._id)) {
req.flash("error", "you are not the owner of this Listing");
return res.redirect(`/listings/${id}`);
   }
   next();
};

// to check deletion of review by it's onwer
module.exports.isReviewAuthor = async (req, res, next) => {
 let { id,reviewId } = req.params;
   let review = await Review.findById(reviewId);
   if (!review.AuthorBy.equals(res.locals.currUser._id)) {
req.flash("error", "you are not the owner of this review");
return res.redirect(`/listings/${id}`);
   }
   next();
};

