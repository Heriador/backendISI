const { Schema, model } = require("mongoose");
const { appConfig } = require('../config/index');

const fileSchema = new Schema({
    filename:{
        type: String,
        required: true
    },
    originalname:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    ext:{
        type: String,
        required: true
    },
    size:{
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    patch:{
        type: String,
        required: true
    }
    ,
    userId: {
        type: String,
        required:true
    }
},{
    timestamps: true
});


module.exports = model('Files', fileSchema);