const User = require("../models/users.js");

module.exports.rendersignupForm=(req, res) => {
  res.render("users/signUp.ejs");
}



module.exports.signuplisting=async (req, res) => {
    try {
      let { username, email, password } = req.body;
   

      let Newuser = new User({ username, email });
      const RegisterUser = await User.register(Newuser, password);
      

      //direct loggedin after signup functionality
      req.login(RegisterUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Marvel");
        res.redirect("/listings");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  }

  module.exports.renderloginForm= (req, res) => {
  res.render("users/Login.ejs");
}


  module.exports.loginlisting=(req, res) => {
    req.flash("success", "Welcome Back to Marvel,You Are Login");

    let redirectUrl = res.locals.RedirectUrl || "/listings";
    res.redirect(redirectUrl);
  }


module.exports.logoutlistings=(req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next();
    }
    req.flash("success", "successfully Logged out");
    res.redirect("/listings");
  })
};


