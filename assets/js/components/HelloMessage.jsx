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
        console.log('do rendering...');
        return <div onClick={this.onClick}>hello</div>;
    }
}
