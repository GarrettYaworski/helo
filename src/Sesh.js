import React, { Component } from 'react';
import axios from 'axios'



class Sesh extends Component {

  logTheSesh(){
    axios.get(`/api`).then(res => console.log('SESH INFO: ', res)).catch(err => console.log(err))
  }


  render() {
    return (
        <div className="Sesh">
          <button onClick={() => this.logTheSesh()}>Log Sesh!!</button>
        </div>
    );
  }
}

export default Sesh;




