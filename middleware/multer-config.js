const multer = require('multer');

//un objet pour associé le mime type à une extension
//on utilise mime type pour identifier l'extension de l'image
const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//le middleware pour renommer et stocker sur disque l'image téléchargée
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'images');
    },
    filename: (req, file,callback)=>{
        const name = file.originalname.split(' ').join('_'); //on remplace les espaces par des underscores
        const extension = MIME_TYPE[file.mimetype];
        callback(null,name+Date.now()+'.'+extension);
    }
});

module.exports = multer({storage:storage}).single('image');