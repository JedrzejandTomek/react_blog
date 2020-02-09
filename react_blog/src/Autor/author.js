import React from "react";

export default class Author extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            name: "John",
            surname: "Smith",
            age: 30

        }

    }

    render() {
        return (

            <div>
                <p>{this.state.name}</p>
                <p>{this.state.surname}</p>
                <p>{this.state.age}</p>
            </div>
    );


    }

}