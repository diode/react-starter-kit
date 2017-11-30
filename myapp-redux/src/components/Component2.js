import React, { Component } from 'react';
import './Component2.css';

import { connect } from 'react-redux';

class Component2 extends Component {

  render() {

    return (
      <div className="component2">
        <h4>Component 2</h4>
        <label> Application Name is { this.props.appName } </label> 
      </div>
    );
  }
}

export default connect(
  state => {
    return state.ui.get("component2Props")
  },
  {  }
)(Component2);
