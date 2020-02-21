import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: "",
            content: "",
            errormessage: ""
           
        };
    }

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let errId = '';
        let errTitle = '';
        let errContent = '';


        if (name === "id") {
            if (value !="" && !Number(value)) {
                errId = <strong>Your ID must be a number</strong>;

            }
            this.setState({errormessage: errId});
        }
        
    

        if (name === "title"){
            if (value.length <= 2){
                errTitle = <strong>Your title must be more than 2 characters</strong>;
            }  
            this.setState({errormessage: errTitle});
        }

        
        if (name === "content"){
            if (value.length <= 100){
                errContent = <strong>Your content must be more than 100 characters</strong>;
            }  
            this.setState({errormessage: errContent});
        }

       

        this.setState({[name]: value});
    }

    render() {
        return (
            <form className="form">
                <p>Please enter ID:</p>
                <input
                    type='text'
                    name='id'
                    onChange={this.myChangeHandler}
                />
                <p>Please enter title:</p>
                <input
                    type='text'
                    name='title'
                    onChange={this.myChangeHandler}
                />
                <p>Please enter content:</p>
                <textarea className="text-area"
                    type='text'
                    name='content'
                    onChange={this.myChangeHandler}
                />
                    <br/><br/>

                    <button className="submitButton">Submit</button>

                    <h4>{this.state.errormessage}</h4>

            </form>

                        
        );
    }
}

