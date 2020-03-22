import React, {Component} from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class ArticleTable extends Component {


    deleteArticle = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:4000/articles/delete-article/' + this.props.obj._id)
            .then((res) => {
                console.log('Deleted!')
            }).catch((error) => {
                console.log(error)
        })
        this.forceUpdate();
    }

    render(){
        return (<tr>
            <td>{this.props.obj.email}</td>
            <td>{this.props.obj.title}</td>
            <td>{this.props.obj.content}</td>
            <td>
                <Link to={"/edit-article/" + this.props.obj._id}>
                    Edit
                </Link>
                <button onClick={this.deleteArticle}>Delete</button>
            </td>
        </tr>)
    }

}