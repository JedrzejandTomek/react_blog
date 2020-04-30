import React from 'react';
import Comment from './Comment';

class CommentsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: this.props.comments
        }
    }

    commentsList = () => {
        return this.props.comments
            .filter(res => res.postID === this.props.postID)
            .map((res, i) => { 
                return <Comment postID={this.props.postID} edit={this.props.edit} obj={res} key={i} />
             })
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