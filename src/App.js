import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import LoginForm from './components/login.component.jsx';

class App extends Component {
  constructor() {
    super();
  }

  handleChange = (name, text) => {
    this.setState({
      [name]: text
    });
  }

  handleSubmit = (formData) => {
     fetch('https://httpbin.org/anything', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    .then(function(response) {
      formData.router.push('/dashboard');
    }).catch(function(err) {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
      <h2> Welcome </h2>
      <LoginForm onChange={this.handleChange} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
