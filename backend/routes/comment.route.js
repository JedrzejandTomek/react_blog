let mongoose = require('mongoose'),
 express = require('express'),
 router = express.Router();

let commentSchema = require('../models/Comment');

router.route('/create-comment').post((req, res, next) => {
   commentSchema.create(req.body, (error, data) => {
       if(error) {
           return next(error)
       } else {
           console.log(data);
           res.json(data)
       }
   })
});

router.route('/').get((req, res) => {
    commentSchema.find((error, data) => {
        if(error) {
            console.log(error)
            res.json('')
        } else {
            res.json(data)
        }
    })
})


router.route('/delete-comment/:id').delete((req, res, next) => {
    commentSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if(error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;

