const http = require('http');
const app = require('./app');

//on normalise en covertissant un string en int si posssible
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//la fonction pour gérer les erreurs et l'enregistrer dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'nécessite plus de privilèges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'est déjà en cours d\'utilisation.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
//ecouteur d'événement pour enregistrer le port ou le canal
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    console.log('Listening on ' + bind);
});


server.listen(port);