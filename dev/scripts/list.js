import React from "react";

export default class List extends React.Component {
    constructor(){
        super();
        this.state={
            editing: false,
            contactInfo: {}
        }
        this.save = this.save.bind(this)
        this.showContacts = this.showContacts.bind(this)
    }
    save(e) {
        e.preventDefault();
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`users/${userId}/notes/${this.props.data.key}`);
        dbRef.update({
            name: this.name.value,
            address: this.address.value,
            work: this.work.value,
            other: this.other.value
        });

        this.setState({
            editing: false
        });
    }
    showContacts(){
        this.contactList.classList.toggle("showContacts")
    }
    render(){
        let editingTemp = (
            <span>
                <p className="main-name" onClick={this.showContacts}>{this.props.data.name}<i className="fa fa-caret-down" aria-hidden="true"></i></p>
                <div className="contactList" ref={ref => this.contactList = ref}>
                    <p onClick={() => this.getMap}><i className="fa fa-home" aria-hidden="true"><span className="sr-only">Home</span></i> - {this.props.data.address}</p>
                    <p><i className="fa fa-briefcase" aria-hidden="true"><span className="sr-only">work</span></i> - {this.props.data.work}</p>
                    <p>Other - {this.props.data.other}</p>
                    <button onClick={() => {
                            this.setState({ editing: true })
                    }}>edit <i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button onClick={() => this.props.remove(this.props.data.key)}>Remove <i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
            </span>
            
        )
        if (this.state.editing) {
            editingTemp = (
                <form onSubmit={this.save}>
                    <input type="text" name="name" defaultValue={this.props.data.name} onChange={this.onChange} ref={ref => this.name = ref} placeholder="name" />
                   
                    <input type="text" name="address" id="address" defaultValue={this.props.data.address} onChange={this.onChange} ref={ref => this.address = ref} placeholder="home address" />
                    <input type="text" name="work" id="work" defaultValue={this.props.data.work} onChange={this.onChange} ref={ref => this.work = ref} placeholder="work address"/>
                    <input type="text" name="other" id="other" defaultValue={this.props.data.other} onChange={this.onChange} ref={ref => this.other = ref} placeholder="other address"/>
                    <input type="submit" value="Done editing" onChange={this.onChange}/>
                </form>
            )
        }
        return (
         
            <li key={this.props.data.key}>
                    {editingTemp}
                 
                </li>

        )
    }
}
