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

class EditPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            author: "",
            title: "",
            content: "",
            postImage: null
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get("/posts/" + this.props.match.params.id)
        .then(res => {
            console.log(res)
            this.setState({
                author: res.data.author,
                title: res.data.title,
                content: res.data.content,
                postImage: res.data.postImage
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    selectedImage = e => {
        this.setState({
            postImage: e.target.files[0]
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

         const editPost = new FormData();
        editPost.append('author', this.state.author);
        editPost.append('title', this.state.title);
        editPost.append('content', this.state.content);
        editPost.append('postImage', this.state.postImage);

        axios.put("/posts/" + this.props.match.params.id, editPost)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))

        this.props.history.push('/discussion/'+ this.props.match.params.id)
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

export default EditPost;