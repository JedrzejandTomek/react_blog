const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//Comment model
const Comment = require('../../models/Comment');

// @route GET /comments
// @desc Get all comments
//@access public

router.get('/', (req, res) => {
    Comment.find()
    .then(comments => res.json(comments))
});

// @route POST /comment
// @desc Post a comment
//@access public

router.post('/', [
    check('comment', 'Comment is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('postID', 'PostID is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newComment = new Comment({
        comment: req.body.comment,
        author: req.body.author,
        postID: req.body.postID
    });
    newComment.save()
    .then(comment => res.json({status: 'Comment saved', comment}))
    .catch(error => res.json({status: `Can't save comment, error: ${error}`}))
});

// @route PUT /comment/:id
// @desc Update a comment
//@access public

router.put('/:id', [
    check('comment', 'Comment is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('postID', 'PostID is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Comment.findById(req.params.id)
    .then(comment => comment.update({$set: req.body})
    .then(() => res.json({status: 'Comment updated'})))
    .catch(error => {
        console.log(error)
        res.status(404)
    })
})

// @route GET /comment/:id
// @desc Get a comment
//@access public

router.get('/:id', (req, res) => {
    Comment.findById(req.params.id)
    .then(comment => {
        res.json(comment)
    })
    .then(() => console.log('Found'))
    .catch(error => {
        console.log(error)
        res.status(404)
    })
})

// @route DELETE /comment/:id
// @desc Delete a comment
//@access public

router.delete('/:id', (req, res) => {
    Comment.findById(req.params.id)
    .then(comment => comment.remove().then(()=> res.json({status: 'Comment deleted'})))
    .catch(error => {
        console.log(error)
        res.status(404)
    })
})

module.exports = router;