import React from 'react';
import CommentsList from './CommentsList';
import axios from 'axios';
import {
    Form,
    Input,
    Button
} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class CommentsComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            comment: "",
            author: "",
            commentError: " ",
            comments: [],
            editCommentId: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/comments')
        .then(res => {
            this.setState({
                comments: res.data
            })
        })
        .catch(error => console.log(error))
    }

    componentDidUpdate() {
        axios.get('/comments')
        .then(res => {
            this.setState({
                comments: res.data
            })
        })
        .catch(error => console.log(error))
    }

    validateComment = () => {
        this.setState({
            commentError: ""
        })
        
        if(this.state.author === "") {
            this.setState({
                author: "Anonymous"
            })            
        }

        if (this.state.comment === "") {
            this.setState({
                commentError: "Comment can't be empty!"
            })
        }
    }

    async onSubmit (e) {
        e.preventDefault();
        await this.validateComment();

        if (this.state.editCommentId === "") {
            const comment = {
            comment: this.state.comment,
            author: this.state.author,
            postID: this.props.postID
            }

            axios.post('/comments', comment)
            .then(res => console.log(res))

            this.props.history.push('/discussion/' + this.props.postID)
        } else {
            const editComment = {
                comment: this.state.comment,
                author: this.state.author
            }

            axios.put('/comments/' + this.state.editCommentId, editComment)
            .then(res => console.log(res))
        }

        this.setState({
            comment: "",
            author: ""
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
            console.log(res)
            this.setState({
                comment: res.data.comment,
                author: res.data.author,
                editCommentId: res.data._id
            })
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        return(
            <div>
                <CommentsList postID={this.props.postID} edit={this.editComment} comments={this.state.comments}/>
                <p>Dodaj komentarz:</p>
                <Form onSubmit={this.onSubmit} className="add-comment">
                    <Input type="text" value={this.state.comment} name="comment" onChange={this.onChange} placeholder="Comment:" />
                        
                    <Input type="text" value={this.state.author} name="author" onChange={this.onChange} placeholder="Anonymous" className="ml-2" />
                    <Button type="submit" className="ml-2">Submit</Button>
                </Form>
                <p className="validation-error">{this.state.commentError}</p>
            </div>
        )
    }
}

export default withRouter(CommentsComponent)