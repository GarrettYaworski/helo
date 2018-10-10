import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Home extends Component {
  constructor(){
    super()

    this.state = {
      userid: ''
    }
  }

  render() {
    return (
        <div className="Home">
          <input type="text" onChange={ e => this.setState({userid: e.target.value})}/>
          <Link to={`/user/${this.state.userid}`}>Click me for user info</Link> 
        </div>
    );
  }
}

export default Home;
