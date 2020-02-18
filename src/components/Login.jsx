import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
class Login extends Component {
    state ={
        username:"",
        password:""
    }

    handleChange = (e) => {
        let {name , value} = e.target
        this.setState({
            [name]:value
        })
    }


    handleSubmit = (evt) => {
        evt.preventDefault()
        const {username,password} = this.state
        
        fetch("https://k-bart-backend.herokuapp.com/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(r => r.json())
        .then(res => {
            this.props.login(res)
            
        })
    }
    render() {
       
        let {username,password} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Username:</label> 
                    <input type='text' name='username' value={username} onChange={this.handleChange}/>
                    <br />
                    <br />
                    <label>password:</label>
                    <input type='text' name='password' value={password} onChange={this.handleChange}/>
                    <br />
                    <br />
                    <input type='submit' name='submit' value='submit' />
            </form>
        );
    }
}

export default withRouter(Login);