import React, { Component }  from 'react';
import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Landing from './components/Landing'
import Login from "./components/Login"
import Profile from "./components/profile"
class App extends Component {
  state = {
    user: {},
    token:"",
    addedItem: {},
    searchTerm: ""
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token")

      fetch("https://k-bart-backend.herokuapp.com/persist", {
        headers: {
          "Authorization": `bearer ${token}`
        }
      })
      .then(r => r.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", data.user.id)
          this.setState({
            user: data.user,
            token: data.token
          },() => console.log(localStorage))
        }
      })


    }}
    handleLogin = (obj) => {
      this.setState({
        user:obj.user,
        token:obj.token
      },() => {
        console.log(this.state.user)
        localStorage.setItem("token", obj.token)
        localStorage.setItem("user", obj.user.id)
        this.props.history.push("/landing")
      })
    }

    

  handleSubmit= (name,emailLogin,passwordIdentification,credits,rating,bio) => {
    fetch('https://k-bart-backend.herokuapp.com/users', {
      method: "POST",
      headers: {
                'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        emailLogin,
        passwordIdentification,
            credits,
            rating,
            bio                    
      })

    })
.then( r => r.json())
.then(resp => {
  if (!resp.error) {
    localStorage.setItem("token", resp.token)
    localStorage.setItem("user", resp.user.id)
    this.setState({
      user: resp.user,
      token: resp.token
    }, () => {
      this.props.history.push("/landing")
    })
}}
)}
  logout = () => {
    this.setState({
      user:{}
    })
  }
  renderForm = () => <Form OnSubmit={this.handleSubmit}/>
  renderLanding = () => <Landing addedItem={this.state.addedItem} searchTerm = {this.state.searchTerm}/>
  pushToLanding = () => {
    this.props.history.push("/landing")
    return <Landing/>
  }
  renderLogin = (routerProps) => {
    return <Login login={this.handleLogin}/>
  }

  renderProfile = () => <Profile obj={this.state.user} />

  handleSearch = (wordsFromNav) =>{
      this.setState({
          searchTerm: wordsFromNav
      },() => { console.log(this.state.searchTerm)})
  }


  logout = () => {
    this.setState({
      user:{}
    })
  }

  
  render(){
    // console.log(this.state.user)
    return (
      <div>
        <Navbar user ={this.state.user} handleSearch={this.handleSearch} logout={this.logout}/>
        <Switch>
          <Route path="/signup" component={this.renderForm} />
          
          <Route path="/profile" component={this.renderProfile} />
          <Route path="/login" component={this.renderLogin} />
          <Route path="/landing" exact  component={this.renderLanding} />
          <Route path='/' exact component={this.pushToLanding}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);