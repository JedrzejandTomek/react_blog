import React from 'react';
import axios from 'axios';
import Post from './Post';

class PostsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        axios.get("/posts")
        .then(res => {
            this.setState({
                articles: res.data
            })
        })
        .catch(error => {console.log(error)});
    }

    postsList = () => {
        return this.state.articles.map((res, i) => {
            return <Post obj={res} key={i} />
        })
    }

    render() {
        return(
            <div>
                {this.postsList()}
            </div>
        )
    }
}

export default PostsList;