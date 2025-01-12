//client.controller

// Importer les dépendances nécessaires
const slugify = require('slugify');
const db = require('../../database/db.config');
const Client = db.clients;
const User = require('../models/user.model');

// Créer un nouveau client
exports.create = async (req, res) => {
    const { name, phone, email, password, repeatpassword } = req.body;
    
    // Vérifier si l'email est déjà utilisé par un autre client
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
        return res.status(400).send({ message: 'This email is already registered.' });
    }

    // Vérifier si l'email est déjà utilisé par un utilisateur
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: 'This email is already registered by another user.' });
    }

    // Si l'email n'est pas déjà utilisé, créer un nouveau client
    const slug = slugify(name, '-');
    const newClient = new Client({
        name: name,
        phone: phone,
        email: email,
        password: password,
        repeatpassword: repeatpassword,
        lastEmailSent: null, // Initialiser à null
        emailHistory: [] // Initialiser à un tableau vide
    });

    try {
        const savedClient = await newClient.save();
        res.status(201).send({
            message: 'Client successfully created',
            data: savedClient
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'An error occurred while creating the client' });
    }
};

// Trouver tous les clients
exports.findAll = (req, res) => {
    Client.find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while fetching clients' });
        });
};

// Trouver un client par son ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }
    Client.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'Client not found' });
            }
            res.status(200).send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while fetching the client' });
        });
};

// Supprimer un client par son ID
exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }
    Client.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'Client not found' });
            }
            res.status(200).send({ message: 'Client successfully deleted' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while deleting the client' });
        });
};


// Mettre à jour un client par son ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { name, phone, email, password,repeatpassword } = req.body;
    if (!id || !name || !phone ||!email ||!password ||!repeatpassword) {
        return res.status(400).send({ message: 'Name and Phone are required fields' });
    }
    Client.findByIdAndUpdate(id, { name: name, phone: phone, email: email, password: password, repeatpassword: repeatpassword }, { useFindAndModify: false })

        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot update Client with id=${id}` });
            }
            res.status(200).send({ message: 'Client was successfully updated' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while updating the client' });
        });
};
0