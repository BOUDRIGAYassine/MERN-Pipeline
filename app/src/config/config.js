//config.js
require("dotenv").config();

const config = {
    DB_URL: process.env.DB_URL // Correction de la clé
}

module.exports = config;
