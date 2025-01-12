// post.controller.js
const slugify = require('slugify');
const db = require('../../database/db.config');
const Post = db.posts;

// create a new post
exports.create = (req, res) => {
    const { title, content, author, slug, tags ,supplier} = req.body;
    if (!title || !content || !author || !slug ||!tags ||!supplier  ) {
        return res.status(400).send({
            message: 'Content can not be empty'
        });
    }
    const slugy = slugify(slug, '-');
    const newPost = new Post({
        title: title,
        content: content,
        author: author,
        slug: slugy,
        tags: tags,
        supplier:supplier,
         
    });
    newPost.save()
        .then(data => {
            res.status(201).send({
                message: 'Successfully created post',
                data: data
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while creating the post' });
        });
};

// find all posts
exports.findAll = (req, res) => {
    Post.find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while fetching posts' });
        });
};

// find post by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }
    Post.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'Post not found' });
            }
            res.status(200).send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while fetching the post' });
        });
};

// delete post by id
exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }
    Post.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'Post not found' });
            }
            res.status(200).send({ message: 'Post successfully deleted' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while deleting the post' });
        });
};

// update post by id
exports.update = (req, res) => {
    const id = req.params.id;
    const { title, content,author,slug, tags,supplier } = req.body;
    if (!id || !title || !content ||!author ||!slug ||!tags ||!supplier ) {
        return res.status(400).send({ message: 'Content is required' });
    }
    Post.findByIdAndUpdate(id, { title: title, content: content ,author:author,slug:slug,tags:tags}, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot update Post with id=${id}` });
            }
            res.status(200).send({ message: 'Post was successfully updated' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'An error occurred while updating the post' });
        });
};
