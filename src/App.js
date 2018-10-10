import React, { Component } from 'react';
import {Link, HashRouter} from 'react-router-dom'
import router from './router'
import './App.css';

class App extends Component {
  constructor(){
    super()

    this.state = {
      userid: ''
    }
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          {router}
        </div>
      </HashRouter>
    );
  }
}

export default App;