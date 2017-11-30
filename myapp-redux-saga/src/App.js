import React, { Component } from 'react';
import './App.css';

import Component1 from './components/Component1';
import Component2 from './components/Component2';

import { appActions } from './redux/store';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount(){
    setTimeout(this.props.getData, 3000);
  }

  render() {

    return (
      <div className="App">
        <h2> This Application is { this.props.status } </h2>
        { this.props.ready &&
          <div className="components">
            <Component1 />
            <Component2 />
          </div>
        }
      </div>
    );
  }
}

export default connect(
  state => {
    return state.app.toJS()
  },
  { getData : appActions.getData }
)(App);
