const { Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

userSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(15);
    return hash = await bcrypt.hash(password,salt);
};

userSchema.methods.matchPassword = async password => {
    return await bcrypt.compare(password,userSchema.password)
}

module.exports = model('User',userSchema);