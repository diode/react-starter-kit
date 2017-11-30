import React, { Component } from 'react';
import './Component2.css';

class Component2 extends Component {

  render() {

    return (
      <div className="component2">
        <h4>Component 2</h4>
        <label> Application Name is { this.props.applicationName } </label> 
      </div>
    );
  }
}

export default Component2;
