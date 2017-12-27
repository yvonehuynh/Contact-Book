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

function autocompleteInput() {
  // autocomplete
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-90, -180),
    new google.maps.LatLng(90, 180));

  var input = document.getElementById("address");
  var options = {
    bounds: defaultBounds,
    types: ['(regions)'],
  };
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  // end autocomplete
}

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
    const location = document.getElementById("address").value;
    const contactListing = {
      name: this.state.name,
      address: location
    };

    console.log(location)
    this.setState({
      name: "",
      address: ""
    });

    const dbRef = firebase.database().ref();
    dbRef.push(contactListing);
  }
    render() {
      const myData = this.state.contacts
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => <List data={item} />);

      return (
        <div>
          <form onSubmit={this.addItem}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
            <label htmlFor="address">Address</label>
            {autocompleteInput()}
            <input type="text" name="address" id="address" value={this.state.address} onChange={this.onChange}/>
            <input type="submit"/>
          </form>
          <ul>
        {myData}
         </ul>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
