const User = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/models/user.js")

module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signup = async(req,res)=>{
    try{
        let {username , email , password} = req.body;
    const newUser = new User({email , username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err) return console.log(err);
        req.flash("success", "successfully registered");
        res.redirect("/listings");
    });
    }
    catch(e){
        req.flash("error", e.message)
        res.redirect("/signup");
    }
    
}

module.exports.renderLogin =(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
    req.flash("welcome ! successfully logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err) return next(err);
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    })
}