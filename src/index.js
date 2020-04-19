import React from "react";
import ReactDOM from "react-dom";
import AddArticle from "./components/addArticle";
import styles from "./style.css";
import Author from '../src/components/author';
import ArticleList from './components/articleList';
import EditArticle from './components/editArticle';
import Contact from './components/contact';
import Home from './components/home';
import viewPost from './components/viewPost/viewPost';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";


class Main extends React.Component {
    render() {
        return(
            <Router>
            <div>
              
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/author">Author</Link>
                    </li>
                      <li>
                        <Link to="/create-article">Add Article</Link>
                    </li>
                    <li>
                        <Link to="/article-list">Article List</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>

                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route path="/author" component={Author} />
                    <Route path="/create-article" component={AddArticle} />
                    <Route path="/edit-article/:id" component={EditArticle} />
                    <Route path="/article-list" component={ArticleList} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/articles/:id" component={viewPost} />
                   
                </Switch>

        
           </div>
            </Router>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));

