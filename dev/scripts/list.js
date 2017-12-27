import React from "react";

export default class List extends React.Component {
    constructor(){
        super();
    }
    render(){
 
        return (
            <li>{this.props.data.name}- {this.props.data.address}</li>    
        )
    }
}
