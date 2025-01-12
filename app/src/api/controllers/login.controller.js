const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//@route POST /api/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe dans la base de données
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid Email or Password!'
            });
        }

        // Comparer les mots de passe avec bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Email or Password not matched!'
            });
        }

        // Créer un jeton et l'envoyer au client
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({
            status: "success",
            result: {
                token: token,
                userId: user._id
            },
            message: "Logged In Successfully"
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
