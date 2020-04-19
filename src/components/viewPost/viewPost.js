import React from 'react';
import axios from 'axios';

   

class ViewPost extends React.Component {

    constructor(props){
        super(props)

         this.state = {
            email: '',
            title: '',
            content: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/articles/show-article/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    email: res.data.email,
                    title: res.data.title,
                    content: res.data.content
                });
            })
            .catch((error) => {
                console.log(error)
            })
    }
        render (){
    return (
        <div>
            {this.state.title}
            {this.state.content}
            {this.state.email}
        </div>
    )
        }
}

export default ViewPost;
