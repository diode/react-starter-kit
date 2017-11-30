import React, { Component } from 'react';
import './Component1.css';

import { uiActions } from '../redux/store';
import { connect } from 'react-redux';

class Component1 extends Component {
  
  sendProps(){
    this.props.sendComp2Props({
      appName : this.props.applicationName 
    });
  }

  setDifferentName(e){
    this.setState({
      differentName : e.target.value || ""
    });
  }

  sendDifferentProps(){
    this.props.sendComp2Props({
      appName : this.state.differentName
    });
  }

  render() {

    return (
      <div className="component1">
        <h4>Component 1</h4>
        <p> Name of Application is { this.props.applicationName } </p> 
        <button onClick= { this.sendProps.bind(this) }> Send  Name </button>
        <p>
          <input onChange={ this.setDifferentName.bind(this) }/>
          <button onClick={ this.sendDifferentProps.bind(this) }> Send Different Name </button>
        </p>
      </div>
    );
  }
}

export default connect(
  state => {
    return state.ui.get("component1Props")
  },
  { sendComp2Props : uiActions.sendComp2Props }
)(Component1);

