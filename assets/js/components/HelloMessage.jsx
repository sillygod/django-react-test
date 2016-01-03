import React from 'react';

export default class HelloMessage extends React.Component {

    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        console.log('enter click');
    }

    render(){
        return (<div onClick={this.onClick}>hello</div>);
    }
}