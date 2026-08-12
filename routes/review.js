const express = require("express");
const router = express.Router({ mergeParams: true }); // true use for add review check in mongoose.route property
const WrapAsync = require("../util/WrapAsync.js");

const {
  isLoggedIn,
  ValidateReview,
  isReviewAuthor,
} = require("../middleware.js");
const reviewconstroller = require("../controller/reviews.js");



//reviews1
//post repite route
router.post(
  "/",
  isLoggedIn,
  ValidateReview,
  WrapAsync(reviewconstroller.createreview),
);

//deleteing review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(reviewconstroller.destroyreview),
);

module.exports = router;
