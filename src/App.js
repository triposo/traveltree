import React, { Component } from 'react';
import './style/app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    )
  }
}

export default App;
