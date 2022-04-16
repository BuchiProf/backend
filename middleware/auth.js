//un middlewre pour gérer les authorisation par token

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //on stocke la deuxième partie de l'entete authorisation (après bearer)
        const token = req.headers.authorization.split(' ')[1];
        //on stocke l'objet renvoyé et décodé gràace à la clé secrete
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //on récupère dans l'objet l'userId
        const userId = decodedToken.userId;
        //on rajoute ce user id certifié dans la requete sous la forme d'un objet (pour protéger delete)
        req.auth = { userId: userId };
        //s'il y a un user id et qu'il ne correspond pas à celui décodé dans le token
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';   //on jette une erreur
        } else {
            next(); //tout est bon on enchaine avec la route
        }
        //si le try ne marche pas 
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

