import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Author from "../Autor/author";

export default function Navigation() {
    return(
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/..Autor/author">Author</Link>
                    </li>


                </ul>

                <Switch>
                    <Route path="/..Autor/author">
                        <Author/>
                    </Route>

                </Switch>

            </div>


        </Router>
    );

}
