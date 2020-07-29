const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userCtrl = {}

userCtrl.SignUp = async (req,res) => {
    try {
        const {name, email, password, passwordCheck } = req.body;
        const exists = await User.findOne({email});
        if(password !== passwordCheck){
            res.status(400).json({'msg': 'La contraseñas deben coincidir'})
        }
        if(exists){
            res.status(400).json({'msg':'El correo ingresado ya se encuentra registrado'});
        }
        else{
            const newUser = new User({
            name,
            email,
            password
        })
        newUser.password = await newUser.encryptPassword(password);
        const user=await newUser.save()
        res.json(user)
        }
    } catch (error) {
        console.error(error);
    }
}

userCtrl.LogIn = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user= await User.findOne({email });
        if(!user){
            res.status(400).json({msg: 'ninguna cuenta se ha resgitrado con esta correo'});
        }
        
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            res.status(400).json({msg: 'invalid credentials'})
        } 

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user:{
                id: user._id,
                email: user.email,
                name: user.name
            }
        })
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}

userCtrl.DeleteUser = async (req,res) =>{
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({message: err.message})
    }
}

userCtrl.tokenValid = async (req,res) =>{
    try {
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);

        const verified = jwt.verify(token,process.env.JWT_SECRET)
        if(!verified) return res.json(false)

        const user = await User.findById(verified.id);
        if(!user) return res.json(false)
        
        return res.json(true)
    } catch (error) {
        res.status(500).json({message: err.message})
    }
}

module.exports = userCtrl;