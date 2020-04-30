import React from "react";

export default function About() {

        return (
            
<div >
    <div className="content-box">
        <div className="image-container">
            <div className="image-box">
                <img src={require("./pics/utah.jpg")}/>
            </div>

             <div className="image-box">
                <img src={require("./pics/maledives.jpg")}/>
            </div>
        </div>
    </div>  
    <div className="made">
    <h2>Blog made by Jedrzej and Tomek &copy;</h2>  
    </div>
</div>
    );
    

}