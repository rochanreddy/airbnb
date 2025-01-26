const express = require("express");
const router = express.Router();
const User= require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users")

router.get("/signup", userController.renderSignup)

router.post("/signup",wrapAsync(userController.signup));

router.get("/login",userController.renderLogin );

router.post("/login",saveRedirectUrl ,passport.authenticate("local" ,{failureRedirect: "/login" , failureFlash : true,}),userController.login);

router.get("/logout",userController.logout)

module.exports = router;