const express = require('express');
const Posts = require('../db.js');
const { route } = require('../../server.js');

const router = express.Router();

router.post('/', (req, res) => {
    const post = req.body;
    Posts.insert(post)
        .then(res => {
            res.status(201).json(post);
        })
        .catch(err => {
            if(post.title === undefined || post.contents === undefined){
                res.status(400).json({errorMessage: "Please provide title and contents for the post."})
            } else {
                res.status.json({error: "There was an error while saving the post to the database."})
            }
        })
});

router.post('/:id/comments', (req, res) => {
    const comment = req.body;
    const { id } = req.params;
    comment.post_id = id;

    Posts.insertComment(comment)
        .then(res => {
            res.status(201).json(comment)
        })
        .catch(err => {
            if(comment.text === undefined){
                res.status(400).json({errorMessage: "Please provide text for the comment."})
            } else {
                res.status(500).json({error: "There was an error while saving the comment to the database."})
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
})

router.get('/', (req, res) => {
    Posts.find()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: 'Could not retrieve posts.'})
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Posts.findById(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res(404).json({message: "The post with the specified ID does not exist."})
            res(500).json({error: "The post information could not be retrieved."})
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;

    Posts.findCommentById(id)
        .then(response => {
            res.status(200).json(res) 
        })
        .catch(err => {
            res.status(404).json({message: "The post with the specified ID does not exist"});
            res.status(500).json({error: "The comments information could not be retrieved."})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Posts.remove(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json({message: "The post with the specified Id does not exist."})
            res.status(500).json({error: "The post could not be removed."})
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;

    Posts.remove(id, post)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            if(post.title === undefined || post.contents === undefined){
                res.status(400).json({errorMessage: "Please provide title and contents for the post"})
            } else {
                res.status(500).json({error: "The post information could not be modified."})
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
})
module.exports = router;