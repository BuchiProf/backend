//le fichier contenant toute la logique des routes pour stuff
const express = require('express');
//création de routeurs 
const router = express.Router();
//on importe le middleware authentification
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/stuff');

router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/', auth, stuffCtrl.getAllThings);


module.exports = router;