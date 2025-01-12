// db.config.js
const config = require('../config/config');
const mongoose = require('mongoose'); 
const db = {};

mongoose.Promise = global.Promise; // Correction de la syntaxe

mongoose.set('strictQuery', false);
db.mongoose = mongoose;
db.url = config.DB_URL;
db.suppliers = require('../api/models/supplier.model')(mongoose); // Importation du modèle des fournisseurs
db.clients = require('../api/models/client.model')(mongoose); // Importation du modèle des clients
db.posts = require('../api/models/post.model')(mongoose); // Importation du modèle des posts

module.exports = db;
