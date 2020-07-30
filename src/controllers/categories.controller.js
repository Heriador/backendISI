const Categories = require('../models/Categories');
const categoriesCtrl = {}

categoriesCtrl.getcategories = async (req,res) => {
    try {
        const files = await Categories.find({userId: req.params.userid});
        res.json(files)
    } catch (error) {
        console.error(error.message);
    }
}

categoriesCtrl.createCategorie = async (req,res) =>{
    try {
        const { name , Files, userId} = req.body;
        const newCategorie = new Categories({
            name,
            Files,
            userId
        })
        await newCategorie.save();
        const data = await Categories.find({userId});
        res.json(data)
    } catch (error) {
        console.error(error.message);
    }
}

categoriesCtrl.getcategorie = async (req,res) => {
    try {
        const file = await Categories.findOne({name: req.params.id});
        res.json(file)
    } catch (error) {
        console.error(error.message);
    }
}

categoriesCtrl.updateCategorie = async (req,res) => {
    try{
        const categorie = await Categories.findById(req.params.id);
        await Categories.findOneAndUpdate({_id: req.params.id},{
            name: categorie.name,
            Files: [...categorie.Files,req.body]
        })
    } catch(err){
        console.error(err.message);
    }
}

categoriesCtrl.deleteCategorie = async (req,res) =>{
    try {
        const cat = await Categories.findById(req.params.id);
        await Categories.findByIdAndDelete(req.params.id)
        const data = await Categories.find({userId: cat.userId});
        res.json(data);
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = categoriesCtrl;