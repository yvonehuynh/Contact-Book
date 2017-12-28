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
    bounds: defaultBounds
    //types: ['(address)'],
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
      address: "",
      work: "",
      other: ""
    };
    this.onChange = this.onChange.bind(this)
    this.addItem = this.addItem.bind(this)
    this.showMore = this.showMore.bind(this)
    this.removeItem = this.removeItem.bind(this)
  };
  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (firebaseData) => {
      const contacts = [];
      const itemsData = firebaseData.val();
      for (let itemKey in itemsData) {
        itemsData[itemKey].key = itemKey;
        contacts.push(itemsData[itemKey])
      }
      console.log(contacts)
      this.setState({
        contacts
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
    const address = document.getElementById("address").value;
    const work = document.getElementById("work").value;
    const other = document.getElementById("other").value;
    const name = this.state.name;
    const contactListing = {
      name,
      address,
      work,
      other
    };

    this.setState({
      name: "",
      address: "",
      work: "",
      other: ""
    });

    const dbRef = firebase.database().ref();
    dbRef.push(contactListing);
  }
  showMore(){
    document.querySelector(".more-addresses").classList.toggle("show")
  }
  removeItem(itemToRemove){
    const dbRef = firebase.database().ref(itemToRemove);
    dbRef.remove();
  }
    render() {
      const myData = this.state.contacts
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => <List data={item} key={item.key} remove={this.removeItem}/>);

      return (
        <div>
          <form onSubmit={this.addItem}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onChange} ref={ref => this.name = ref}/>
            <label htmlFor="address">Home Address</label>
            {autocompleteInput()}
            <input type="text" name="address" id="address" value={this.state.address} onChange={this.onChange} ref={ref => this.address = ref}/>
            <input type="submit"/>
            <a onClick={()=>this.showMore()}>More Addresses</a>
            <div className="more-addresses">
              <label htmlFor="work">Work Address</label>
              <input type="text" name="work" id="work" value={this.state.work} onChange={this.onChange} ref={ref => this.work = ref}/>
              <label htmlFor="other">Other Address</label>
              <input type="text" name="other" id="other" value={this.state.other} onChange={this.onChange} ref={ref => this.other = ref}/>
            </div>
          </form>
          <div>
            {myData}
         </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
