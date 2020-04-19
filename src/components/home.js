import React from 'react'
import HomePageContent from './homePageContent'
import axios from 'axios'
import viewPost from './viewPost/viewPost.js'

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


export default class Home extends React.Component {


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
        return this.state.articles.map((article, index) => {
            return <a href={`/articles/${article._id}`}>
            
            <HomePageContent obj={article} key={index}/></a>;
        });
    }

    render(){
               
        return(
            <div>
                {this.dataTable()}
           
            </div>
            
        )
    }
}


