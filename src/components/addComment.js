import React from 'react';
import axios from 'axios';

export default class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        };
    }

        onChangeComment = (e) => {
        this.setState({
            content: e.target.value
        });
    }

        onSubmit = (e) => {
        e.preventDefault()

        const comment = {
            content: this.state.content,
        }

        axios.post('http://localhost:4000/comments/create-comment', comment)
            .then(res => console.log(res.data));

        this.setState({
            content: ''
        })
    }


    render() {
        return (
            <form onSubmit ={this.onSubmit}>

                <p>Add Comment:</p>
                <input
                    type='text'
                    name='content'
                    onChange = {this.onChangeComment}
                    value={this.state.content}
                />
                    <button className="submitButton" type="submit">Add Comment</button>

            </form>

                        
        );
    }
}

