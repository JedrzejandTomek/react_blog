import React, {Component} from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class HomePageContent extends Component {


    

    render(){
        return (
        
                    <div className="article-box">
                        <article class="article">
                              <div className="article-title">
                                <h1>{this.props.obj.title}</h1>
                            </div>
                            <div className = "email">
                                {this.props.obj.email}
                            </div>
                          
                        </article>
                    </div>
    
                )
            }
}