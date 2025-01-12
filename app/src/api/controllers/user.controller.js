const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { isValidEmail } = require('../../middleware/UserValidation');
require('dotenv').config();

// @desc Register a new user
// @route POST /api/register
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, repeatPassword } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Vous êtes déjà inscrit.' });
    }

    // Vérifier si l'email est valide
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: 'Format d\'adresse email invalide.' });
    }

    // Vérifier la longueur et le format du mot de passe
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      return res.status(400).json({
        msg: 'Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre majuscule.'
      });
    }

    // Vérifier si les mots de passe correspondent
    if (password !== repeatPassword) {
      return res.status(400).json({ status: 'error', message: 'Les mots de passe ne correspondent pas.' });
    }

    // Hasher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = await User.create({ username, email, password: hashedPassword });

    return res.status(201).json({
      status: 'success',
      data: {
        user: user,
      }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: 'error',
      message: 'Une erreur est survenue lors de l\'enregistrement de l\'utilisateur.'
    });
  }
};
