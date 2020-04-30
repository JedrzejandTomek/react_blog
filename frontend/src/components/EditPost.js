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
            titleError: " ",
            contentError: " "
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get("/posts/" + this.props.match.params.id)
        .then(res => {
            this.setState({
                author: res.data.author,
                title: res.data.title,
                content: res.data.content
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
        e.preventDefault()
        await this.validateForm();

        if(this.state.titleError === "" && this.state.contentError === "") {
            const editedPost = {
                author: this.state.author,
                title: this.state.title,
                content: this.state.content
            }

            axios.put("/posts/" + this.props.match.params.id, editedPost)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))

            this.props.history.push('/discussion/'+ this.props.match.params.id)
        }
    }

    render() {
        return(
             <div className="form-container">
                <Form onSubmit={this.onSubmit} className="form">
                    <FormGroup className="mx-auto">
                        <Label for="author">Author</Label>
                        <Input type="text" id="author" name="author" placeholder="Author:" onChange={this.onChange} value={this.state.author}/>

                    </FormGroup>
                    <FormGroup className="mx-auto">
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" name="title" placeholder="Title:" onChange={this.onChange} value={this.state.title}/>
                        <p className="validation-error">{this.state.titleError}</p>

                    </FormGroup>
                    <FormGroup className="mx-auto">
                        <Label for="Content">Content</Label>
                        <Input type="textarea" id="content" name="content" placeholder="Content:" onChange={this.onChange} value={this.state.content}/>
                        <p className="validation-error">{this.state.contentError}</p>

                    </FormGroup>
                    <Col className="text-center"><Button type="submit">Submit</Button></Col>
                </Form>
            </div>
        )
    }
}

export default EditPost;
