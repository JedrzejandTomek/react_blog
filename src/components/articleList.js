import React, {Component} from "react"
import axios from 'axios'
import ArticleTable from './articleTable'

export default class ArticleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/articles/')
            .then(res => {
                this.setState({
                    articles: res.data
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    dataTable() {
        return this.state.articles.map((res, i) => {
            return <ArticleTable obj={res} key={i}/>;
        });
    }

    render() {
        return (
            <div className="table-wrapper">
                <table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Author</th>
                        <th>Content</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.dataTable()}
                    </tbody>
                </table>
            </div>
        )
    }

}