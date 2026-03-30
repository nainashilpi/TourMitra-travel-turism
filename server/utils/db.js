const mongoose = require("mongoose");
// const URI = "mongodb://127.0.0.1:27017/mern_admin"


console.log("Mongo URI:", URI);
const connectDb = async()=>{
    try {
        await mongoose.connect(URI);
        console.log('connection is successful to DB')

    } catch (error) {
        console.error("database connection is fail");
           

        process.exit(1);
    }
};

module.exports = connectDb;