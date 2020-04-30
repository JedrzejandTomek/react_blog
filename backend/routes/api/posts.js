const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check, body, validationResult } = require('express-validator');


//file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);    }
}); 

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
        console.log('Not valid format')
    }
};

const upload = multer({storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 50
    },
        fileFilter : fileFilter
    });

//Post model
const Post = require('../../models/post');

// @route GET /posts
// @desc Get all posts
//@access public

router.get('/', (req, res) => {
    Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
});


// @route POST /posts
// @desc Create a post
//@access public

router.post('/img', upload.single('postImage'), [
    body('author', 'Author is required').not().isEmpty(),
    body('title', 'Title is required').not().isEmpty(),
    body('content', 'Content is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newPost = new Post({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        postImage: req.file.path
    });
    newPost.save()
    .then(post => res.json(post));
});

router.post('/', [
    check('author', 'Author is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newPost = new Post({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    });
    newPost.save()
    .then(post => res.json(post));
});

// @route DELETE /posts/:id
// @desc Delete a post
//@access public

router.delete('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({status: 'Post deleted'})))
    .catch(error => res.status(404).json({status: `Can't remove, error: ${error}`}));
});

// @route UPDATE /posts/:id
// @desc Update a post
//@access public

router.put('/:id', [
    check('author', 'Author is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Post.findById(req.params.id)
    .then(item => item.update({$set: req.body})
    .then(() => res.json({status: 'Post updated'})))
    .catch(error => res.status(404).json({status: `Can't update, error: ${error}`}));
})

// @route GET /posts/:id
// @desc Get a post
//@access public

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(item => res.json(item))
    .then(() => res.json({status: 'Found'}))
    .catch(error => {
        res.status(404);
        //console.log(error);
    });
});


module.exports = router;