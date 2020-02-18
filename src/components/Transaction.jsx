import React, { Component } from 'react';
import Item from './item';
import {Container} from "semantic-ui-react"
class transaction extends Component {

    state = {
        items: []
    }    

    componentDidMount() {
        fetch(`https://k-bart-backend.herokuapp.com/items/personal/${localStorage.user}`)
        .then(r => r.json())
        .then(res => {
            console.log(res)
        
            this.setState({
                items: res
            })
        })
    }

    personalItems = () => this.state.items.map(item => <Container textAlign='left'> <Item key={item.id} obj= {item}  /></Container>)
    
    render() {
        return (
                <ul>
                {this.personalItems()}
                </ul>
            
        );
    }
}

export default transaction;