import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class User extends React.Component{
  constructor(){
    super()

      this.state = {
        user: {},
        sesh: false,
        trannys: []
      }

      this.handleSeshStuffs = this.handleSeshStuffs.bind(this)
      this.handleTrannys = this.handleTrannys.bind(this)
  }

  componentDidMount(){
    axios(`/api/${this.props.match.params.id}`)
    .then(res => {
      this.setState({user: res.data[0]})
    })
    .catch(err => console.log(err))
  }

  handleSeshStuffs(){
    axios.post(`/api/sesh?user=${this.state.user.first_name}`)
    .then(res => {
      console.log(res)
      alert(`added ${res.data.first_name} to the sesh!!`)
    })
    .catch(err => console.log(err))
    this.setState({sesh: true})
  }

  handleTrannys(){
    axios(`/api/transactions/${this.props.match.params.id}`)
    .then(res => {
      this.setState({trannys: res.data})
    })
    .catch(err => console.log(err))
  }

  render(){
    return(
      <div>
        <div>{`${this.state.user.first_name} ${this.state.user.last_name}`}</div>
        <button onClick={() => this.handleSeshStuffs()}>Put user on the sesh</button>
        <Link to='/testsesh'><button>sesh page</button></Link>
        {this.state.sesh ? <button onClick={() => this.handleTrannys()}>List transactions</button> : null}
        {this.state.trannys[0] ? this.state.trannys.map(tran =>  <div>{tran.order_number}</div>) : null}
      </div>
    )
  }
}


