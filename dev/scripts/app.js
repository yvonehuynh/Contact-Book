import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      contacts: {},
      name: "",
      address: ""
    };
    this.onChange = this.onChange.bind(this)
  };
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
    render() {
      return (
        <div>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" value={this.state.address} onChange={this.onChange}/>
          </form>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
