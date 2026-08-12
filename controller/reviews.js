const listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createreview = async (req, res) => {
  let Listings = await listing.findById(req.params.id);
  if (!Listings) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  let newreview = new Review(req.body.review);
  newreview.AuthorBy = req.user._id;
  Listings.reviews.push(newreview);
  req.flash("success", "New Review Added");
  await newreview.save();
  await Listings.save();
  console.log("new review added");
  res.redirect(`/listings/${Listings._id}`);
};

module.exports.destroyreview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Review Deleted!");
  console.log("review is deleted");
  res.redirect(`/listings/${id}`);
};
