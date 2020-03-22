import React from "react";
import ReactDOM from "react-dom";
import AddArticle from "./components/addArticle";
import styles from "./style.css"
import Author from '../src/components/author'
import ArticleList from './components/articleList'

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";


class Main extends React.Component {
    render() {
        return(
            <Router>
            <div>
              
                <ul>
                    <li>
                        <Link to="/author">Author</Link>
                    </li>
                      <li>
                        <Link to="/create-article">Add Article</Link>
                    </li>
                    <li>
                        <Link to="/articleList">Article List</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/author" component={Author} />
                    <Route path="/create-article" component={AddArticle} />
                    <Route path="/article-list" component={ArticleList} />
                </Switch>

        
           </div>
            </Router>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));

