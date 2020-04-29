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
            postImage: null,
            titleError: " ",
            contentError: " "
            }
        this.onSubmit = this.onSubmit.bind(this);
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

    validateForm = () => {
        this.setState({
            titleError: "",
            contentError: ""
        })

        if (this.state.author === "") {
            this.setState({
                author: "Anonymous"
            })
        }

        if (this.state.title === "") {
            this.setState({
                titleError: "Title is required!"
            })
        }

        if (this.state.content === "") {
            this.setState({
                contentError: "Content is required!"
            });
        }
    }

     async onSubmit(e) {
        e.preventDefault();
        await this.validateForm();
        
        if(this.state.titleError === "" && this.state.contentError === "") {
            if(this.state.postImage !== null) {
                const post = new FormData();
                post.append('author', this.state.author);
                post.append('title', this.state.title);
                post.append('content', this.state.content);
                post.append('postImage', this.state.postImage);
        
                axios.post('/posts/img', post)
                .then(res => console.log(res.data))
                .then(this.setState({
                    author: "",
                    title: "",
                    content: "",
                    postImage: null
                    })
                ).then(this.props.history.push('/posts-list'))
            } else {
    
                const post = {
                    author: this.state.author,
                    title: this.state.title,
                    content: this.state.content
                }
        
                axios.post('/posts', post)
                .then(res => console.log(res.data))
                .then(this.setState({
                    author: "",
                    title: "",
                    content: ""
                    })
                ).then(this.props.history.push('/posts-list'))
            }
        }
    }

    render() {
        return(
            <div className="form-container">
                <Form onSubmit={this.onSubmit} className="form">
                    <FormGroup className="mx-auto">
                        <Label for="author">Author</Label>
                        <Input type="text" id="author" name="author" placeholder="Anonymous" onChange={this.onChange} />
                    </FormGroup>
                    
                    <FormGroup className="mx-auto">
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" name="title" placeholder="Title:" onChange={this.onChange} />
                        <p className="validation-error">{this.state.titleError}</p>
                    </FormGroup>

                    <FormGroup className="mx-auto">
                        <Label for="Content">Content</Label>
                        <Input type="textarea" id="content" name="content" placeholder="Content:" onChange={this.onChange} />
                        <p className="validation-error">{this.state.contentError}</p>
                    </FormGroup>

                    <FormGroup>
                        <Input type="file" id="postImage" ref={ fileInput => this.fileInput = fileInput } onChange={this.selectedImage}/>
                    </FormGroup>

                    <Col className="text-center"><Button type="submit">Submit</Button></Col>
                </Form>
            </div>
        )
    }
}

export default PostForm;
