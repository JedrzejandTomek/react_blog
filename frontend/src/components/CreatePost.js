import React from 'react';
import {
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import axios from 'axios';

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            author: "",
            title: "",
            content: "",
            postImage: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value})
    }

    selectedImage = e => {
        this.setState({
            postImage: e.target.files[0]
        })
    }

    onSubmit = (e) => {
        e.preventDefault()


        const post = new FormData();
        post.append('author', this.state.author);
        post.append('title', this.state.title);
        post.append('content', this.state.content);
        post.append('postImage', this.state.postImage);

        axios.post('/posts', post)
        .then(res => console.log(res.data))

        this.setState({
            author: "",
            title: "",
            content: "",
            postImage: null
        });

        this.props.history.push('/posts-list')
    }

    render() {
        return(
            <div className="form-container">
                <Form onSubmit={this.onSubmit} className="form">
                    <FormGroup className="mx-auto">
                        <Label for="author">Author</Label>
                        <Input type="text" id="author" name="author" placeholder="Author:" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup className="mx-auto">
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" name="title" placeholder="Title:" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup className="mx-auto">
                        <Label for="Content">Content</Label>
                        <Input type="textarea" id="content" name="content" placeholder="Content:" onChange={this.onChange} />
                    </FormGroup>

                    <div>
                        <input type="file" id="postImage" ref={fileInput => this.fileInput = fileInput} onChange={this.selectedImage}/>
                    </div>

                    <Col className="text-center"><Button type="submit">Submit</Button></Col>
                </Form>
            </div>
        )
    }
}

export default PostForm;
