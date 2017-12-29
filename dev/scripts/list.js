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
        const dbRef = firebase.database().ref(this.props.data.key);
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
        console.log("click!")
    }
    render(){
        let editingTemp = (
            <span>
                <p className="main-name" onClick={this.showContacts}>{this.props.data.name}</p>
                <div className="contactList" ref={ref => this.contactList = ref}>
                    <p>Home - {this.props.data.address}</p>
                    <p>Work - {this.props.data.work}</p>
                    <p>Other - {this.props.data.other}</p>
                    <button onClick={() => {
                            this.setState({ editing: true })
                        }}>edit</button>
                        <button onClick={() => this.props.remove(this.props.data.key)}>Remove</button>
                </div>
            </span>
        )
        if (this.state.editing) {
            editingTemp = (
                <form onSubmit={this.save}>
                    <input type="text" name="name" defaultValue={this.props.data.name} onChange={this.onChange} ref={ref => this.name = ref} />
                   
                    <input type="text" name="address" id="address" defaultValue={this.props.data.address} onChange={this.onChange} ref={ref => this.address = ref} />
                    <input type="text" name="work" id="work" defaultValue={this.props.data.work} onChange={this.onChange} ref={ref => this.work = ref} />
                    <input type="text" name="other" id="other" defaultValue={this.props.data.other} onChange={this.onChange} ref={ref => this.other = ref} />
                    <input type="submit" value="Done editing" />
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
