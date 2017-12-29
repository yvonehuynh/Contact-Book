import React from "react";

export default class Auth extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <nav>
                {
                    (() => {
                        if (this.props.loggedIn === true) {
                            return (
                                <div>
                                    <a onClick={this.props.logOut}>Logout</a>
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <a onClick={this.props.showCreate}>Create User</a>
                                    <a onClick={this.props.showLogin}>Login</a>
                                </div>
                            )
                        }
                    })()
                }
            </nav>
        )
    }
}