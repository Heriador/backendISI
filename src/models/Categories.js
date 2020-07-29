const {Schema, model} =require('mongoose');

const categorieSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    Files: {
        type: Array,
        default: []
    },
    userId:{
        type: String,
        required: true
    }
})

categorieSchema.methods.addFile = function addFile(file){
    this.Files.push(file);
}

module.exports = model('Categorie',categorieSchema);