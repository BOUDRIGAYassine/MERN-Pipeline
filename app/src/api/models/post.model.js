//post.model.js
module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let PostSchema = new Schema ({
        
        title: { type: String, required: true },
        content: { type: String, required: true },
        slug: { type: String, required: true },
        tags: { type: Array },
        author: { type: String, required: true },
        published: { type: Boolean, enum: [true, false], default: true },
        supplier: { type: Schema.Types.ObjectId, ref: 'supplier', required: true },
    }, {
        timestamps: true
    });

    // Corregir método toJSON
    PostSchema.methods.toJSON = function() {
        const { __v, _id, ...object } = this.toObject(); // Cambiar 'toobject' por 'toObject' y '__v' por '__v'
        object._id = _id; // Corregir 'id' por '_id'
        return object;
    };

    const Post = mongoose.model('Post', PostSchema);
    return Post;
}
 