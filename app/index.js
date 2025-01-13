//index.js
const express = require('express');
const database = require('./src/database/db.config');
require('dotenv').config();
const app = express(); 
const cors=require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database.mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to database');
    // Commencer à écouter le port une fois que la connexion à la base de données est établie
})
.catch(err => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send({ message: 'Hello, World!' });
});

// Charger les routes pour les fournisseurs, les clients et les articles
require('./src/api/routes/routes')(app, database);

const PORT = process.env.PORT || 3001; // Définir le port par défaut si non spécifié dans .env
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
