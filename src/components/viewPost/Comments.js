import React, {useState} from 'react'
import axios from 'axios'

function Comments(props) {

    const [Comment, setComment] = useState('')

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            comment: Comment,
            postId: props.postId
        }

        axios.post('http://localhost:4000/comments/create-comment', variables)
        .then(res => {
            if(res.data.success) {
                setComment('')
                props.refreshFunction(res.data)
                console.log('Comment added!')
            } else {
                console.log('comment added but error?')
            }
        })
    }

    return (
        <div>
            <hr />
            <form className='comment-box' onSubmit={onSubmit}>
            <input type='textarea' className='comment'
            onChange={handleChange}
            value={Comment}
            placeholder='Add comment'
            />
            <br />
            <button className='comment-button' onClick={onSubmit}>Add Comment</button>
            </form>
            {console.log(props.commentsList)}
        </div>
    )
}

export default Comments;
