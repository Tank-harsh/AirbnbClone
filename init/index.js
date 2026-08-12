const mongoose = require("mongoose");
const initData = require("./data.js")
const listing = require("../models/listing.js");  // here listings is collection


const mongo_url = "mongodb://127.0.0.1:27017/marvel";

main().then(res => {
    console.log("connected to DATABASE");
})
    .catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(mongo_url);
}


const initDB = async () => {
    // Step 1: Clear all existing listings
    await listing.deleteMany({});

   // Step 2: Add owner to every listing object
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: '6a61f4af3045da1a94df96e7',
    }));

   //set default coordinates
initData.data = initData.data.map((obj) => ({
        ...obj,
       geometry:{ 
        type: 'Point',
         coordinates: [ 74.054111, 15.325556 ] 
        },
    }));



     //Step 3: Insert all 20 listings from data.js
    await listing.insertMany(initData.data);

//console.log("✅ All data inserted successfully! Total:",listing.length());


//for delete all reviews in database
  //await Review.deleteMany();
// console.log("all reviews are deleted");
}
initDB();




