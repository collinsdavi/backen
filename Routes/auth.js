const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {registerValidation, loginValidation} = require('../validation');




router.post('/register', async (req,res) => {

//LETS VALIDATE THE DATA BEFORE WE MAKE A USER
  const {error} = registerValidation(req.body);
// res.send(error.details[0].message);
if(error) return res.status(400).send(error.details[0].message);

//Checking if the user is already in the database
const emailExit = await User.findOne({email: req.body.email});
if(emailExit) return res.status(400).send('Email already exists');


//hash passwords
const salt = await bcrypt.gentSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);

//Create a new user
    const user = new User({
name: req.body.name,
email: req.body.email,
password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
        }catch(err){
            res.status(400).send(err)
        }
});

// router.post('/login')
//LOGIN
router.post('/login', async (req,re) => {
    const {error} = loginValidation(req.body);
    // res.send(error.details[0].message);
    if(error) return res.status(400).send(error.details[0].message);
    //Cheacking if the email exists
    const emailExit = await User.findOne({email: req.body.email});
if(emailExit) return res.status(400).send('Email or password is wrong');

//PASSWORD IS CORRECT
const validPass = await bcrypt.compare(req.body.password, user.password);
if(!validPass) return res.status(400).send('inavlid password')

//Create and assign a token
const token = jwt.sign({_id: user.__id}, process.env.TOKEN_SECRET);
res.header('auth-token', token).send(token);


// res.send('Logged in!');

});

module.exports = router;