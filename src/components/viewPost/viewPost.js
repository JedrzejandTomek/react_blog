import React from 'react'
import axios from 'axios';
import Comments from './Comments'

   

class ViewPost extends React.Component {

    constructor(props){
        super(props)

         this.state = {
            email: '',
            title: '',
            content: '',
            commentsList: [],
            setCommentsList: []
        }
    }
         
           updateComment = (newComment) =>{
                 this.state.setCommentsList(this.state.commentsList.concat(newComment))
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
            <Comments commentsList={this.state.commentsList} postId = {this.props.match.params.id} refreshFunction={this.updateComment}/>
        </div>
    )
        }
}

export default ViewPost;
