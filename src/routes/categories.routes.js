const { Router } = require('express');
const router = Router();
const { 
    getcategories,
    createCategorie, 
    getcategorie,
    updateCategorie,
    deleteCategorie
} = require('../controllers/categories.controller');

router.route('/')
    .post(createCategorie)

router.route('/all/:userid')
    .get(getcategories)

router.route('/:id')
    .get(getcategorie)
    .put(updateCategorie)
    .delete(deleteCategorie)


module.exports = router;