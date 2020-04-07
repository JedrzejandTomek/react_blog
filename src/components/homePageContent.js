import React, {Component} from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddComment from './addComment'
import CommentList from './commentList'

export default class HomePageContent extends Component {


    

    render(){
        return (
        
                    <div className="article-box">
                        <article class="article">
                            <div className="article-title">
                                <h1>{this.props.obj.title}</h1>
                            </div>
                            <div className="article-content">
                                {this.props.obj.content}
                            </div>
                            <div className = "email">
                                {this.props.obj.email}
                            </div>
                            <div>
                            <AddComment />
                            <CommentList />
                            </div>
                        </article>
                    </div>
    
                )
            }
}