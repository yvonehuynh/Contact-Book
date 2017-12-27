import React from "react";

export default class List extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <li>{this.props.data}</li>
        )
    }
}