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
            title: "",
            content: "",
            email: "",
            errTitle: "",
            errContent: "",
            errEm: ""
        }
    }

    onChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        let errTitle = '';
        let errContent = '';
        let errEm = '';


        // walidacja tytułu    
        if (name === "title"){
            if (value.length <= 2 || value.length >=20){
                errTitle = <strong>Your title must be more than 2 and less then 20 characters </strong>;
            }  
            this.setState({errTitle: errTitle});
        }

        // walidacja treści  
        if (name === "content"){
            if (value.length <= 100 || value.length >=800 ){
                errContent = <strong>Your content must be more than 100 and less then 800 characters</strong>;
            }  
            this.setState({errContent: errContent});
        }

         // walidacja e-maila  
        if (name === "email") {
            if (!/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i.test(value)) {
                errEm = <strong>Please enter valid e-mail</strong>;

            }
            this.setState({errEm: errEm});
        }

            this.setState({[name]: value});
    }

    onSubmit = (e) => {
        //e.preventDefault()

        const post = {
            title: this.state.title,
            content: this.state.content,
            email: this.state.email
        }
        
        console.log(post);

        axios.post('/posts', post)
        .then(res => console.log(res.data))

        this.setState({
            title: "",
            content: "",
            email: ""
        })

        this.props.history.push('/')
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.onSubmit} className="form">
                    <FormGroup className="mx-auto">
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" name="title" placeholder="Title:" onChange={this.onChange} />
                        <h6>{this.state.errTitle}</h6>
                    </FormGroup>
                    
                    <FormGroup className="mx-auto">
                        <Label for="Content">Content</Label>
                        <Input type="textarea" id="content" name="content" placeholder="Content:" onChange={this.onChange} />
                        <h6>{this.state.errContent}</h6>
                    </FormGroup>
                    
                    <FormGroup className="mx-auto">
                        <Label for="Email">Email</Label>
                        <Input type="textarea" id="email" name="email" placeholder="Email:" onChange={this.onChange} />
                        <h6>{this.state.errEm}</h6>
                    </FormGroup>
                    
                    <Col className="text-center"><Button type="submit">Submit</Button></Col>
                </Form>
            </div>
        )
    }
}

export default PostForm;
