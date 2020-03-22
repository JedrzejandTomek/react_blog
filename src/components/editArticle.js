import React from 'react';
import axios from 'axios';

export default class AddArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            title: "",
            content: "",
            errormessage: "",
           
        };
    }

    // walidacja formularza     

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let errEm = '';
        let errTitle = '';
        let errContent = '';

        if (name === "email") {
            if (!/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i.test(value)) {
                errEm = <strong>Please enter valid e-mail</strong>;

            }
            this.setState({errormessage: errEm});
        }
        
    

        if (name === "title"){
            if (value.length <= 2 || value.length >=20){
                errTitle = <strong>Your title must be more than 2 and less then 20 characters </strong>;
            }  
            this.setState({errormessage: errTitle});
        }

        
        if (name === "content"){
            if (value.length <= 100 || value.length >=800 ){
                errContent = <strong>Your content must be more than 100 and less then 800 characters</strong>;
            }  
            this.setState({errormessage: errContent});
        }

       

        this.setState({[name]: value});
    }

        componentDidMount() {
        axios.get('http://localhost:4000/articles/edit-article/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    author: res.data.author,
                    content: res.data.content
                });
            })
            .catch((error) => {
                console.log(error)
            })
    }

        onSubmit = (e) => {
        e.preventDefault()

        const article = {
            email: this.state.email,
            title: this.state.title,
            content: this.state.content,
        }

        axios.put('http://localhost:4000/articles/edit-article'
        + this.props.match.params.id, article)
             .then(res => {
                console.log(res.data)
                console.log('Updated!')
            }).catch(error => {
            console.log(error)
        });

         this.props.history.push('/article-list')
    }


    render() {
        return (
            <form onSubmit={this.onSubmit} className="form">

                <p>Please enter your e-mail:</p>
                <input
                    type='text'
                    name='email'
                    onChange={this.myChangeHandler}
                    value={this.state.email}
                />
                
                <p>Please enter title:</p>
                <input
                    type='text'
                    name='title'
                    onChange={this.myChangeHandler}
                    value={this.state.title}
                />


                <p>Please enter content:</p>
                <textarea className="text-area"
                    type='text'
                    name='content'
                    onChange={this.myChangeHandler}
                    value={this.state.content}
                />
                    <br/><br/>

                    <button className="submitButton" type="submit">Add Article</button>

                    <h4>{this.state.errormessage}</h4>

            </form>

                        
        );
    }
}

