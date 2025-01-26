const express = require("express");
const Listing = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/models/listing.js");
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema } = require("../schema.js");
const Review = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/models/reviews.js");

const {validateReview,isLoggedIn,isReviewAuthor} = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/middleware.js")


const reviewController = require("../controllers/reviews.js");


//review route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview )
);

//delete route

router.delete("/:reviewId",isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;