// client.model.js
module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let ClientSchema = new Schema({
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        password: { type: String, required: true },
        repeatpassword: { type: String, required: true }
        
    }, {
        timestamps: true
    });

    // Correction de la méthode toJSON
    ClientSchema.methods.toJSON = function() {
        const { __v, _id, ...object } = this.toObject();
        object._id = _id;
        return object;
    };

   
    const Client = mongoose.model('Client', ClientSchema);
    return Client;
}
