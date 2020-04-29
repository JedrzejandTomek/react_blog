import React from 'react';
import axios from 'axios';
import Comment from './Comment';

class CommentsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        axios.get('/comments')
        .then(res => {
            this.setState({
                comments: res.data
            })
        })
        .catch(error => console.log(error))
    }

    commentsList = () => {
        return this.state.comments
            .filter(res => res.postID === this.props.postID)
            .map((res, i) => { 
                return <Comment edit={this.props.edit} obj={res} key={i} />
             })

        // return this.state.comments.map((res, i) => {
        //     if (res.postID === this.props.postID) {
        //         return <Comment edit={this.props.edit} obj={res} key={i} />
        //     }
        // })
    }

    render() {
        return(
            <div>
                <p>Komentarze:</p>
                {this.commentsList()}
            </div>
        )
    }
}

export default CommentsList;