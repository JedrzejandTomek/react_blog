import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import axios from 'axios';

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            img: ''
        }
    }

    deletePost = () => {
        axios.delete("/posts/" + this.props.obj._id)
        .then((res) => {
            console.log("Post deleted!")
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        if (this.props.obj.postImage) {
            this.setState({
                img: <CardImg height={200} width={200} src={this.props.obj.postImage} />
            })
        }
    }

    render() {
        return(
            <div>
                <div className="p-1">
                    <Card className="mx-auto">
                        <CardBody className="post-list-single-post">
                            {this.state.img}
                            <div className="ml-3">
                                <CardTitle><a href={"/discussion/" + this.props.obj._id }><h5>{this.props.obj.title}</h5></a></CardTitle>
                                <CardText>{this.props.obj.content}</CardText>
                            </div>
                        </CardBody>
                        <footer className="post-footer">
                                <p>Opublikowano: {this.props.obj.date} by {this.props.obj.author}</p>
                        </footer>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Post;