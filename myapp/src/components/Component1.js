import React, { Component } from 'react';
import './Component1.css';

class Component1 extends Component {
  
  sendProps(){
    this.props.setComponent2Props({
      appName : this.props.applicationName 
    });
  }

  setDifferentName(e){
    this.setState({
      differentName : e.target.value || ""
    });
  }

  sendDifferentProps(){
    this.props.setComponent2Props({
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

export default Component1;
