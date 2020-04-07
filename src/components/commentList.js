import React, {Component} from "react"
import axios from 'axios'
import CommentsTable from './commentsTable'

export default class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/comments/')
            .then(res => {
                this.setState({
                   comments: res.data
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    dataTable() {
        return this.state.comments.map((res, i) => {
            return <CommentsTable obj={res} key={i}/>;
        });
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        {this.dataTable()}
                    </tbody>
                </table>
            </div>
        )
    }

}