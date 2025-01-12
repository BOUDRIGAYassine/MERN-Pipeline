//supplier.controller
const slugify = require('slugify');
const db = require('../../database/db.config');
const Supplier = db.suppliers;

// Créer un nouveau fournisseur
exports.create = (req, res) => {
    const { name, contact, email, address, tags , password, repeatPassword} = req.body;
    if (!name || !contact ||!email ||!password ||!repeatPassword) {
        return res.status(400).send({
            message: 'Name and Contact are required fields'
        });
    }
    const slug = slugify(name, '-');
    const newSupplier = new Supplier({
        name: name,
        contact: contact,
        email: email,
        password:password,
        repeatPassword:repeatPassword,
        address: address,
        tags: tags,
        lastEmailSent: null, // Initialiser à null
        emailHistory: [] // Initialiser à un tableau vide
    });
    newSupplier.save()
        .then(data => {
            res.status(201).send({
                message: 'Supplier successfully created',
                data: data
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while creating the supplier' });
        });
};

// Trouver tous les fournisseurs
exports.findAll = (req, res) => {
    Supplier.find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while fetching suppliers' });
        });
};

// Trouver un fournisseur par son ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }
    Supplier.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'Supplier not found' });
            }
            res.status(200).send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while fetching the supplier' });
        });
};

// Supprimer un fournisseur par son ID
// Supprimer un fournisseur par son ID
exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }
    Supplier.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'Supplier not found' });
            }
            res.status(200).send({ message: 'Supplier successfully deleted' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while deleting the supplier' });
        });
};


// Mettre à jour un fournisseur par son ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { name, contact, email, address , password, repeatPassword} = req.body;
    if (!id || !name || !contact  ||!email ||!password ||!repeatPassword) {
        return res.status(400).send({ message: 'Name and Contact are required fields' });
    }
    Supplier.findByIdAndUpdate(id, { name: name, contact: contact, email: email, address: address  , password, repeatPassword}, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot update Supplier with id=${id}` });
            }
            res.status(200).send({ message: 'Supplier was successfully updated' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while updating the supplier' });
        });
};
