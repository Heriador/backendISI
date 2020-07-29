const File = require("../models/Files");
const Categories = require('../models/Categories');
const { appConfig } = require("../config/index");
const filesCtrl = {};
const { host,port} = appConfig;
const fs = require('fs').promises;
const path = require('path');

const Url = filename =>{
    return `${host}/public/assets/${filename}`;
}

const imgUrl = filename =>{

    switch(filename.split(".")[1]){
        case 'png':
            return `${host}/public/img/${filename}`;
        case 'jpg':
            return `${host}/public/img/${filename}`;
        case 'jpeg':
            return `${host}/public/img/${filename}`;
        case 'pdf':
            return `${host}/public/img/pdf.png`;
        case 'xlsx':
            return `${host}/public/img/xlsx.png`;
        case 'docx':
            return `${host}/public/img/word.png`;
        case 'csv':
            return `${host}/public/img/csv.png`;
        case 'mp4':
            return `${host}/public/img/video.png`;
        case 'mp3':
            return `${host}/public/img/audio.png`;
        case 'ppt':
            return `${host}/public/img/powerpoint.png`;
    }
}

filesCtrl.getfiles = async (req, res) => {
    try {
        const files = await File.find({userId: req.params.userid});
        res.status(200).json(files);
    } catch (error) {
        console.error(error.message);
    }
};

filesCtrl.sendfile = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        let i = 0;
        console.log(req.files);
        console.log(title,description);
        req.files.map(async file=>{
            console.log(i)
            const {filename, size,originalname} = file;
            const fileUrl = imgUrl(filename);
            const patch = Url(filename);
            const newFile = File({
                filename,
                originalname,
                ext: filename.split(".")[1],
                size,
                imgUrl: fileUrl,
                patch,
                userId: req.body.user
                });
                    if(!Array.isArray(title)){
                        console.log('uno');
                        newFile.title = title;
                    }
                    else{
                        newFile.title = title[i];
                    }
                    
                    if(!Array.isArray(description)){
                        newFile.description = description
                    }
                    else{
                        newFile.description = description[i];
                    }
                    i++;
            await newFile.save();
            
        })
    } catch (error) {
        console.error(error.message);
    }
    };

filesCtrl.getfile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        res.json(file);
    } catch (error) {
        console.error(error.message);
    }
};

const delAtCat = async (id) => {
    const categire = await Categories.find();
    categire.map(async cat => {
        const FILES = [];
        cat.Files.map(file => {
            if(id !== file._id){
                FILES.push(file);
            }
        })
        const change = await Categories.findOneAndUpdate({_id: cat._id},{
            name: cat.name,
            Files: FILES,
        })
    })
}

filesCtrl.deletefile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        await fs.unlink(path.join(__dirname,`../public/assets/${file.filename}`));
        const delF = await File.findByIdAndDelete(req.params.id);
        const files = await File.find();
        delAtCat(req.params.id)
        res.json(files);
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = filesCtrl;
