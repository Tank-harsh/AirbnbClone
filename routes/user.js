const express = require("express");
const router = express.Router();
const WrapAsync = require("../util/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
module.exports = router;

const listingusers = require("../controller/users.js");

router.get("/signup", listingusers.rendersignupForm);
//signup route
router.post("/signup", WrapAsync(listingusers.signuplisting));

router.get("/login", listingusers.renderloginForm);
//login route
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  listingusers.loginlisting,
);

//logout route
router.get("/logout", listingusers.logoutlistings);
