if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}
const express = require("express");
const Listing = require("../airbnb/models/listing.js");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema , reviewShema} = require("./schema.js");
const Review = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/models/reviews.js");

const listingsRoute = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/routes/listing.js");

const reviewsRoute = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/routes/review.js");

const userRoute = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/routes/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const { maxHeaderSize } = require("http");

const flash= require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const User= require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/models/user.js");

let port = 1300;

const dbUrl = process.env.ATLASDB_UR;

async function main() {
    await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("connected to data base")
})

app.listen(port, () => {
    console.log(`Server started on port${port}`);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.engine("ejs",ejsMate)
app.use(methodOverride('_method'));

const store= MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.secret
    },
    touchAfter: 24*3600,
});



const sessionOpetions ={
    store,
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};






app.get("/",(req , res )=>{
     res.send("home page")
})


app.use(session(sessionOpetions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings",listingsRoute);
app.use("/listings/:id/reviews",reviewsRoute);
app.use("/",userRoute);

app.use(express.static(path.join(__dirname , "/public")));



app.all("*",(req,res,next) =>{
    next(new ExpressError(404 , "page not found"));
})

app.use((err, req, res, next) => {
    console.error("Error middleware triggered:", err);

    if (res.headersSent) {
        return next(err); // Delegate to default Express error handler
    }

    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});



