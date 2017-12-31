import React from "react";

export default class AuthNav extends React.Component {
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
                                <div className="logout auth">
                                <p className="login-name">Logged In as: {this.props.user()}</p>
                                    <a onClick={this.props.logOut}>Logout</a>
                                </div>
                            )
                        } else {
                            return (
                                <div className="login auth">
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
