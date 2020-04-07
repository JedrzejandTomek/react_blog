import React, {Component} from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class CommentsTable extends Component {


    deleteComment = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:4000/comments/delete-comment/' + this.props.obj._id)
            .then((res) => {
                console.log('Deleted!')
            }).catch((error) => {
                console.log(error)
        })
        this.forceUpdate();
    }

    render(){
        return (
        <tr>
            <td>{this.props.obj.content}</td>
            <td>
              
                <button onClick={this.deleteComment}>Delete</button>
            </td>
        </tr>)
    }

}