const mongoose = require("mongoose");
require("dotenv").config(); // 🔥 VERY IMPORTANT

const URI = process.env.MONGODB_URI; // 

console.log("Mongo URI:", URI);

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection is successful to DB");
    } catch (error) {
        console.error("database connection is fail");
        process.exit(1);
    }
};

module.exports = connectDb;