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
            postImage: null,
            titleError: " ",
            contentError: " "
            }
        this.onSubmit = this.onSubmit.bind(this);
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
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

  onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value})
    }

       selectedImage = (e) => {
           e.preventDefault()
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
                const editPost = new FormData();
                editPost.set('author', this.state.author);
                editPost.set('title', this.state.title);
                editPost.set('content', this.state.content);
                editPost.set('postImage', this.state.postImage);
        
                axios.put('/posts/img/' + this.props.match.params.id, editPost)
                .then(res => console.log(res.data))
                .then(this.setState({
                    author: "",
                    title: "",
                    content: "",
                    postImage: null
                    })
                ).then(this.props.history.push('/discussion/'+ this.props.match.params.id))
            } else {
    
                const editPost = {
                    author: this.state.author,
                    title: this.state.title,
                    content: this.state.content
                }
        
                axios.put('/posts/' + this.props.match.params.id, editPost)
                .then(res => console.log(res.data))
                .then(this.setState({
                    author: "",
                    title: "",
                    content: ""
                    })
                ).then(this.props.history.push('/discussion/'+ this.props.match.params.id))
            }
        }
    }




    render() {
        return(
          <div>
                <Form onSubmit={this.onSubmit} className="form">
                    <FormGroup className="mx-auto">
                        <Label for="author">Author</Label>
                        <Input type="text" id="author" name="author" placeholder="Author:" onChange={this.onChange} value={this.state.author} />
                    </FormGroup>
                    <FormGroup className="mx-auto">
                        <Label for="title">Title</Label>
                        <Input type="text" id="title" name="title" value={this.state.title} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup className="mx-auto">
                        <Label for="Content">Title</Label>
                        <Input type="textarea" id="content" name="content" value={this.state.content} onChange={this.onChange} />
                    </FormGroup>
                      <FormGroup>
                        <Input type="file" id="postImage" name="postImage" value={null}  ref={ fileInput => this.fileInput = fileInput }  onChange={this.selectedImage}/>
                    </FormGroup>
                    <Col className="text-center"><Button>Submit</Button></Col>
                </Form>
            </div>
        )
    }
}


export default EditPost;



   

 

   
     
 