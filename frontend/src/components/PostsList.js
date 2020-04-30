import React from 'react';
import axios from 'axios';
import Post from './Post';

function setCookie(cookieName, cookieValue) {

   
    document.cookie = cookieName + "=" + cookieValue;
};

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);

    var ca = decodedCookie.split(";");

    for (var i = 0; i < ca.length; i++) {
        var cookie = ca[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function checkCookie() {

    var counter=getCookie("Visits");
    if (counter === null){
        counter = 1;
    } else {

            counter ++;
            setCookie("Visits", counter);
        }
    }


getCookie();
checkCookie();

class PostsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        axios.get("/posts")
        .then(res => {
            this.setState({
                articles: res.data
            })
        })
        .catch(error => {console.log(error)});
    }

    postsList = () => {
        return this.state.articles.map((res, i) => {
            return <Post obj={res} key={i} />
        })
    }

    render() {
        return(
            <div className="post-list-container">
                {this.postsList()}
            </div>
        )
    }
}

export default PostsList;