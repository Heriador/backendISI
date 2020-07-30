const User = require('../models/User');
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

        res.json(user)
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}

module.exports = userCtrl;