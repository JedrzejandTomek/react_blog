import React from "react";
import ReactDOM from "react-dom";
import Author from "./Autor/author";
import Navigation from "./pasekNawigacji/navigation";
import Form from "./Formularz/form";
import styles from "./style.css"

class Main extends React.Component {
    render() {
        return(
            <div>
                <Navigation />
                <Form />
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));