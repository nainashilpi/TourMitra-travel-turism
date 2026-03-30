const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },

});

// secur the password with the bcrypt
userSchema.pre('save',async function(){
    const user = this;
    if(!user.isModified("password")){
       return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password , saltRound);
        user.password = hash_password;
        next();
    } catch (err) {
        console.log(err);
    }
})

//comparing pass funciton 
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password,this.password);
    
}


//json web token
userSchema.methods.generateToken= async function(){   //this is  instanc method with the help of this we can make the as much as  functions we need  
  try {
    return jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        isAdmin:this.isAdmin,

    },
    process.env.JWT_SECTTECT_KEY,
    {
        expiresIn:"30d",
    }
);
  } catch (err) {
    console.error(err);
  }
};

// define the model or the collection name 
const User = new mongoose.model("User",userSchema);

module.exports = User;