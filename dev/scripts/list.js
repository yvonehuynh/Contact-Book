import React from "react";

export default class List extends React.Component {
    constructor(){
        super();
    }
    render(){
 
        return (
            
            <li key={this.props.data.key}>
                    {this.props.data.name}
                    Home - {this.props.data.address}
                    Work - {this.props.data.work}
                    Other - {this.props.data.other}
                    <button onClick={()=>this.props.remove(this.props.data.key)}>Remove</button>
                </li>
            
        )
    }
}
