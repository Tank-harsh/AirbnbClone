if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override"); //method override package
const engine = require("ejs-mate");
const ExpressError = require("./util/ExpressError.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/users.js");
const userRouter=require("./routes/user.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "public")));


   const dbUrl=process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DATABASE");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}


const store=MongoStore.create({
  mongoUrl:dbUrl,
   
   crypto:{
secret: process.env.SECRET,
   } ,
   touchAfter: 24 * 3600  // for Lazy Update 

});
  
store.on("error",()=>{
  console.log("ERROR IN MONGODB SESSION STORE  ",err)
});

// flash message
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 2 * 24 * 60 * 60 * 1000,
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));


// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser=req.user;
  next();
});


//listings routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);


//error handling
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;

  res.render("listings/error.ejs", { statusCode, message });
});

app.listen(8080, () => {
  console.log("server start");
});
