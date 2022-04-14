//le fichier contenant toute la logique des routes pour stuff
const express = require('express');
//création de routeurs 
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')

router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);
router.get('/', stuffCtrl.getAllThings);


module.exports = router;