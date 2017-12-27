import React from 'react';
import ReactDOM from 'react-dom';
import List from "./list";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      contacts: [],
      name: "",
      address: ""
    };
    this.onChange = this.onChange.bind(this)
    this.addItem = this.addItem.bind(this)
  };
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
      contacts: contactListing,
    });
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
          {Object.keys(this.state.contacts).map((res)=>{
            console.log(res)
            return <List data={res}/>
          })}
         
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
