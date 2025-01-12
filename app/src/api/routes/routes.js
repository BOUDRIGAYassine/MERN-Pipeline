const { registerUser } = require('../controllers/user.controller'); // Importez le contrôleur userController
const { loginUser } = require('../controllers/login.controller'); // Importez le contrôleur userController

module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const supplierController = require('../controllers/supplier.controller');
    const clientController = require('../controllers/client.controller');
    const postController = require('../controllers/post.controller');

    // Routes pour la gestion des fournisseurs
    router.post('/suppliers', supplierController.create);
    router.get('/suppliers', supplierController.findAll);
    router.get('/suppliers/:id', supplierController.findOne);
    router.delete('/suppliers/:id', supplierController.delete);
    router.put('/suppliers/:id', supplierController.update);

    // Routes pour la gestion des clients
    router.post('/clients', clientController.create);
    router.get('/clients', clientController.findAll);
    router.get('/clients/:id', clientController.findOne);
    router.delete('/clients/:id', clientController.delete);
    router.put('/clients/:id', clientController.update);

    // Routes pour la gestion des publications
    router.post('/posts', postController.create);
    router.get('/posts', postController.findAll);
    router.get('/posts/:id', postController.findOne);
    router.delete('/posts/:id', postController.delete);
    router.put('/posts/:id', postController.update);

    // Route pour l'inscription de l'utilisateur
    router.post('/register', registerUser);
    router.post('/login', loginUser); // Utilisez uniquement le contrôleur registerUser ici

    app.use('/api', router);
}
