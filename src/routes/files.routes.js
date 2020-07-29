const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { 
    getfiles, 
    sendfile,
    getfile,
    deletefile 
} = require('../controllers/files.controller');

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/assets'),
    filename: (req,file,cb) => {
        cb(null,uuidv4() + path.extname(file.originalname));
    }
})

const upload = multer({storage});

router.route('/')
    .post(upload.any(),sendfile);

router.route('/all/:userid').get(getfiles);

router.route('/:id')
    .get(getfile)
    .delete(deletefile)



module.exports = router;