import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./components/navigation";
import AddArticle from "./components/addArticle";
import styles from "./style.css"

class Main extends React.Component {
    render() {
        return(
            <div>
                <Navigation />
                <AddArticle />
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));

