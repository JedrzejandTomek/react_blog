import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button, CardImg } from 'reactstrap';
import axios from 'axios';
import CommentsComponent from './CommentsComponent';

class PostDiscussion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            author: "",
            title: "",
            content: "",
            date: ""
        }
    }

    componentDidMount() {
        axios.get('/posts/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                id: res.data._id,
                author: res.data.author,
                title: res.data.title,
                content: res.data.content,
                date: res.data.date,
                postImage: res.data.postImage
            })
        })
    }

    deletePost = () => {
        axios.delete("/posts/" + this.state.id)
        .then((res) => {
            console.log("Post deleted!")
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/posts-list');
    }

    render() {
        return(
            <div>
                <div className="discussion-container p-3">
                    <Card className="mx-auto">
                        <CardBody className="discussion-body">
                            <div className="discussion-image"><CardImg src={this.state.postImage} /></div>
                            <CardTitle><h5>{this.state.title}</h5></CardTitle>
                            <CardText>
                                {this.state.content}
                            </CardText>
                            <footer className="post-footer">
                                <p>Opublikowano: {this.state.date} by {this.state.author}</p>
                                <div>
                                    <Button onClick={this.deletePost} className="float-right"><i className="fa fa-trash-o"></i></Button>
                                    <Button href={"/edit-post/" + this.state.id} className="mr-2 float-right">Edit Post</Button>
                                </div>
                            </footer>
                            <CommentsComponent postID={this.state.id} />                    
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}

export default PostDiscussion;