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
            title: "",
            content: "",
            email: ""
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get("/posts/" + this.props.match.params.id)
        .then(res => {
            console.log(res)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                email: res.data.email
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

    onSubmit = (e) => {
        e.preventDefault()

        const editedPost = {
            title: this.state.title,
            content: this.state.content,
            email: this.state.email
        }

        axios.put("/posts/" + this.props.match.params.id, editedPost)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))

        this.props.history.push('/')
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.onSubmit} className="form">
                    <FormGroup className="mx-auto">
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" name="title" value={this.state.title} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup className="mx-auto">
                        <Label for="Content">Title</Label>
                        <Input type="textarea" id="content" name="content" value={this.state.content} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup className="mx-auto">
                        <Label for="Email">Email</Label>
                        <Input type="textarea" id="email" name="email" value={this.state.email} onChange={this.onChange} />
                    </FormGroup>
                    <Col className="text-center"><Button>Submit</Button></Col>
                </Form>
            </div>
        )
    }
}

export default EditPost;