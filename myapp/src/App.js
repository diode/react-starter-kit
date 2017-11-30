import React, { Component } from 'react';
import './App.css';

import Component1 from './components/Component1';
import Component2 from './components/Component2';

class App extends Component {

  constructor(){
    super();
    this.state = {
      status : "Loading...",
      ready : false,
      error : "",
      component1Props : null,
      component2Props : null
    }
  }

  componentDidMount(){
    setTimeout(this.pickData.bind(this), 3000);
  }


  pickData(){

    // new 'fetch' api in Javascript
    fetch('/data.json').then( (response) => {
      if(response.ok === true){
        response.json().then( this.setData.bind(this) ).catch( this.setDataError.bind(this) );
      }
    } ).catch( this.setDataError.bind(this) ) ;
  }

  setDataError(error) {
    this.setState({
      ready : false,
      status : "in Error state :" + error,
    });
  }

  setData(data) {
    this.setState({
      ready : true,
      status : "Ready",
      component1Props : data
    });
  }

  setComponent2Props(component2Props){
    this.setState({
      component2Props : component2Props
    });
  }

  render() {

    let component1Props = this.state.component1Props || {};
    let component2Props = this.state.component2Props || {};

    return (
      <div className="App">
        <h2> This Application is { this.state.status } </h2>
        { this.state.ready &&
          <div className="components">
            <Component1 applicationName={ component1Props.appName } setComponent2Props ={ this.setComponent2Props.bind(this) } />
            <Component2 applicationName={ component2Props.appName } />
          </div>
        }
      </div>
    );
  }
}

export default App;
