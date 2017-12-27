import React from 'react';
import ReactDOM from 'react-dom';
import List from "./list";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCRb7pafnMnJL7XZcWTLPVe6xY5YEJbL0s",
  authDomain: "my-project-1503010099071.firebaseapp.com",
  databaseURL: "https://my-project-1503010099071.firebaseio.com",
  projectId: "my-project-1503010099071",
  storageBucket: "my-project-1503010099071.appspot.com",
  messagingSenderId: "524797115092"
};
firebase.initializeApp(config);

class App extends React.Component {
  constructor(){
    super();
    this.state={
      contacts: [{
        name: "Yvone Huynh",
        address: "1 maple ave."
      }],
      name: "",
      address: ""
    };
    this.onChange = this.onChange.bind(this)
    this.addItem = this.addItem.bind(this)
  };
  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (firebaseData) => {
      const itemsArray = [];
      const itemsData = firebaseData.val();
      for (let itemKey in itemsData) {
        itemsData[itemKey].key = itemKey;
        itemsArray.push(itemsData[itemKey])
      }
      this.setState({
        contacts: itemsArray
      })
    })
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addItem(e){
    e.preventDefault();
    const contactListing = {
      name: this.state.name,
      address: this.state.address
    };
    this.setState({
      name: "",
      address: ""
    });

    const dbRef = firebase.database().ref();
    dbRef.push(contactListing);
  }
    render() {
      return (
        <div>
          <form onSubmit={this.addItem}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" value={this.state.address} onChange={this.onChange}/>
            <input type="submit"/>
          </form>
          <ul>
            {this.state.contacts.map((res)=>{
              return <List data={res}/>
            })}
         </ul>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
