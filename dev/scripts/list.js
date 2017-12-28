import React from "react";

export default class List extends React.Component {
    constructor(){
        super();
    }
    render(){
 
        return (
            <ul>
                <li>{this.props.data.name}</li>
                <li>Home - {this.props.data.address}</li>
                <li>Work - {this.props.data.work}</li>
                <li>Other - {this.props.data.other}</li>
            </ul>
        )
    }
}
