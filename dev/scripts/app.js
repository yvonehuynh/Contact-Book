import React from 'react';
import ReactDOM from 'react-dom';
import List from "./list";
import AuthNav from "./auth";

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

function autocompleteInput(inputId) {
  // autocomplete
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-90, -180),
    new google.maps.LatLng(90, 180));

  var input = document.getElementById(inputId);
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
      }],
      name: "",
      address: "",
      work: "",
      other: "",
      loggedIn: false
    };
    this.onChange = this.onChange.bind(this)
    this.addItem = this.addItem.bind(this)
    this.showMore = this.showMore.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.showCreate = this.showCreate.bind(this)
    this.createUser = this.createUser.bind(this)
    this.showLogin = this.showLogin.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.logOut = this.logOut.bind(this)
    this.getUser = this.getUser.bind(this)
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        const userId = user.uid;
        const dbRef = firebase.database().ref(`users/${userId}/notes`);

        dbRef.on("value", (firebaseData) => {
          const contacts = [];
          const itemsData = firebaseData.val();
          for (let itemKey in itemsData) {
            itemsData[itemKey].key = itemKey;
            contacts.push(itemsData[itemKey])
          }

          this.setState({
            contacts,
            loggedIn: true
          })
        });
      }
      else {
        this.setState({
          contacts: [{}],
          loggedIn: false
        })
      }
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
    const name = this.state.name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
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

    const userId = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(`users/${userId}/notes`);
    dbRef.push(contactListing);
  }
  showMore(){
    document.querySelector(".more-addresses").classList.toggle("show");
  }
  removeItem(itemToRemove){
    const userId = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(`users/${userId}/notes/${itemToRemove}`);
    dbRef.remove();
  }
  createUser(e) {
    e.preventDefault();
    const email = this.createEmail.value;
    const password = this.createPassword.value;
    const confirm = this.confirmPassword.value;
    if (password === confirm) {
      firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res)=>{
        this.showCreate(e);
      })
      .catch((err)=>{
        alert(err.message)
      })
    } else {
      alert("passwords must match")
    }
  }
  showCreate(e){
    e.preventDefault();
    this.overlay.classList.toggle("show");
    this.createUserModal.classList.toggle("show");
  }
  showLogin(e){
    e.preventDefault();
    this.overlay.classList.toggle("show");
    this.loginModal.classList.toggle("show");
  }
  loginUser(e){
    e.preventDefault();
    const email = this.userEmail.value;
    const password = this.userPassword.value;

    firebase.auth()
      .signInWithEmailAndPassword(email,password)
      .then((res) => {
        this.showLogin(e);
      })
      .catch((err) => {
        alert(err.message)
      })
  }
  logOut(e){
    e.preventDefault();
    firebase.auth().signOut();
  }
  getUser(){
    const user = firebase.auth().currentUser.email;
    return user;
  }
    render() {
      const myData = this.state.contacts
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => <List data={item} key={item.key} remove={this.removeItem} inputs={this.getMap}/>);

      const signOut = (
        <span>
          <h2 className="signin-prompt">Please Sign In or Create an Account</h2>
        </span>
      )

      const showComp = ()=>{
        if (this.state.loggedIn) {
          return myData;
        } else {
          return signOut;
        }
      }

      const showInputs =()=>{
        if (this.state.loggedIn) {
          return (
            <form onSubmit={this.addItem}>
              <div className="main-addresses">
                <label htmlFor="name" className="visually-hidden">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onChange} ref={ref => this.name = ref} placeholder="enter name"/>
                <label htmlFor="address" className="visually-hidden">Home</label>
              {autocompleteInput("address")}
                <input type="text" name="address" id="address" value={this.state.address} onChange={this.onChange} ref={ref => this.address = ref} placeholder="home address" />
             </div>

              <div className="more-addresses">
                <label htmlFor="work" className="visually-hidden">Work</label>
                {autocompleteInput("work")}
                <input type="text" name="work" id="work" value={this.state.work} onChange={this.onChange} ref={ref => this.work = ref} placeholder="work address"/>
                <label htmlFor="other" className="visually-hidden">Other</label>
                {autocompleteInput("other")}
                <input type="text" name="other" id="other" value={this.state.other} onChange={this.onChange} ref={ref => this.other = ref} placeholder="other address" />
              </div>
              <div className="form-actions">
              <input type="submit" value="save to my address book" />
              <a onClick={() => this.showMore()}>Add More Addresses</a>
              </div>
            </form>
          )
        }
      }

      return (
       
        <div className="wrapper">
          <AuthNav loggedIn={this.state.loggedIn} logOut={this.logOut} showCreate={this.showCreate} showLogin={this.showLogin} user={this.getUser}/>

          <div className="loginModal modal" ref={ref => this.loginModal = ref}>
          
            <form action="" onSubmit={this.loginUser}>
                <label htmlFor="email">email</label>
                <input type="email" name="email" ref={ref => this.userEmail = ref}/>
                  <label htmlFor="password">password</label>
              <input type="password" name="password" ref={ref => this.userPassword = ref}/>
              <input type="submit" value="Login"/>
              <button onClick={this.showLogin}>close</button>
          </form>
          </div>

          <div className="overlay" ref={ref => this.overlay = ref}>
          <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
            <form action="" onSubmit={this.createUser}>
              <div>
                <label htmlFor="createEmail">email</label>
                  <input type="email" name="createEmail" ref={ref => this.createEmail = ref} onChange={this.onChange}/>
              </div>
              <div>
                <label htmlFor="createPassword">password</label>
                  <input type="password" name="createPassword" ref={ref => this.createPassword = ref} onChange={this.onChange}/>
              </div>
              <div>
                <label htmlFor="confirmPassword">confirm Password</label>
                  <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} onChange={this.onChange} />
              </div>
              <div>
                  <input type="Submit" value="create" onChange={this.onChange} />
                  <button onClick={this.showCreate}>close</button>
              </div>
            </form>
            </div>
          </div>

          <header>
            <h1>Contact Book <i className="fa fa-map-marker" aria-hidden="true"></i></h1>
            <h2>Your Personal Online Address Book</h2>
            <p>Add your friend's and family's addresses into your own online address book! Add their information into the fields, and select their name below to see your saved addresses.</p>
          </header>
            {showInputs()}
          <div className="contact-list-container">
            {showComp()}
         </div>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
