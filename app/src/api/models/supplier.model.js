module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let SupplierSchema = new Schema({
        name: { type: String, required: true },
        contact: { type: String, required: true },
        email: { type: String },
         
        lastEmailSent: { type: Date },
        emailHistory: [{ date: Date, subject: String, body: String }],
        // Nouveaux champs pour le mot de passe
        password: { type: String, required: true },
        repeatPassword: { type: String, required: true }
    }, {
        timestamps: true
    });

    // Corriger la méthode toJSON
    SupplierSchema.methods.toJSON = function() {
        const { __v, _id, ...object } = this.toObject();
        if (_id) {
            object._id = _id;
        }
        return object;
    };

    const Supplier = mongoose.model('Supplier', SupplierSchema);
    return Supplier;
}
