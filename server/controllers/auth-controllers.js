const User = require("../models/user-model");
// const bcrypt = require("bcryptjs");
 
const home = async (req, res) => {
  try {
    res
      .status(200)
      .send("Welcome to world best mear series by sumit using router");
  } catch (err) {
    console.log(err);
  }
};



// Registration Logic
/*1. Get Registration Data: Retrieve user data(usename , email , password).
  2. Check Email Existence: Check if the email is already registered.
  3. Hash password : Securely hash the password.
  4.Create User:create a new user wit hashed password.
  5. Save to DB : Save user data to the database.
  6.Respond:respond with registration Succesful or handle errors.
*/

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body; // data got

    const userExist = await User.findOne({ email }); //check email existance
    if (userExist) {
      return res.status(400).json({ msg: "email already exits" });
    }

    //hash password
    // const saltRound =10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({ username, email, phone, password }); //:hash_password

    res
      .status(201)
      .json({
        msg: "Registration Succesful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (err) {
    console.log(err);
  }
};


// LOGIN LOGIC

const login = async(req,res)=>{
  try {
    const {email,password} =req.body; 

    //check weather the person is available in the database or not ?? it means the user have done registration 
    const userExist = await User.findOne({email});
    
    if(!userExist){
      return res.status(400).json({msg: "Invalid Credentials"});
    }

    // const user = await bcrypt.compare(password,userExist.password);
    const user = await userExist.comparePassword(password);


    if(user){
      res
      .status(200)
      .json({
        msg: "Login Succesful",
       token: await userExist.generateToken(),
    userId: userExist._id.toString(),
      });
    }else{
      res.status(401).json({msg:"invalid email or password"})
    }

  } catch (err) {
    res.status(500).json("internal server error");
  }
}
module.exports = { home, register,login };
