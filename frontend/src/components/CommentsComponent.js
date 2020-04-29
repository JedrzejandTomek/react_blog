import React from 'react';
import CommentsList from './CommentsList';
import axios from 'axios';
import {
    Form,
    Input,
    Button
} from 'reactstrap';

class CommentsComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            comment: "",
            author: ""
        }
    }

    onSubmit = (e) => {
        const comment = {
            comment: this.state.comment,
            author: this.state.author,
            postID: this.props.postID
        }

        console.log(comment)

        axios.post('/comments', comment)
        .then(res => console.log(res))

        this.setState({
            comment: '',
            author: ''
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    editComment = (id) => {
        axios.get('/comments/' + id)
        .then(res => {
            this.setState({
                comment: res.data.comment,
                author: res.data.author
            })
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        const buttonStyle = {
            width: "100px",
            margin: "auto"
        }

        return(
            <div>
                <CommentsList postID={this.props.postID} edit={this.editComment} />
                <p>Dodaj komentarz:</p>
                <Form onSubmit={this.onSubmit} className="add-comment">
                    <Input type="text" value={this.state.comment} name="comment" onChange={this.onChange} placeholder="Comment:" />
                        
                    <Input type="text" value={this.state.author} name="author" onChange={this.onChange} placeholder="Author:" className="ml-2" />
                    <Button style={buttonStyle} type="submit" className="ml-2">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default CommentsComponent;