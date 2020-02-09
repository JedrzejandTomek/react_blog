import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: "",
            content: ""
        };
    }

    render() {
        return (
            <form>
                <p>Please enter ID:</p>
                <input
                    type='text'
                    name='id'
                />
                <p>Please enter title:</p>
                <input
                    type='text'
                    name='title'
                />
                <p>Please enter content:</p>
                <input
                    type='text'
                    name='content'
                />
                    <br/><br/>

                    <button>Submit</button>
            </form>

        );
    }
}

