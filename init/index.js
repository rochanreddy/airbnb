const mongoose = require("mongoose");
const initdata = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/init/data.js");
const Listing = require("C:/Users/Rochan/OneDrive/Desktop/web development/airbnb/models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

main().then(()=>{
    console.log("connected to data base")
})

const initDB = async() => {
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj , owner: '678a2adf775330b52a90f136'}));
    await Listing.insertMany(initdata.data)
    console.log("data was initialized");
}

initDB();