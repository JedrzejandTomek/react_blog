import React from 'react'


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
       
      

    render(){
               
        return(
            <div>
            <h1>Artykuły</h1>
           
            </div>
            
        )
    }
}