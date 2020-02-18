import React, { Component } from 'react';
import {Container , Form, Grid} from 'semantic-ui-react'
class AddItem extends Component {

    state = {
        name: "",
        price: 0,
        description: "",
        category: "",
        seller_id: 0,
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let {name, price, description} = e.target

        fetch('https://k-bart-backend.herokuapp.com/items/', {
            method: "POST",
            headers: {
                    'content-type': 'application/json'
            },
            body: JSON.stringify({
                 name: name.value,
                 price: price.value,
                 description: description.value,
                 category: 1,
                 seller: localStorage.user
            })
        })
        .then (r => r.json())
        .then( data => {
                // this.props.sendItemsToLanding(data)
        })
    }

    render() {

        

        return (
            <Container>
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Form.Input label="name" placeholder="name" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input label="description" placeholder="description" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input label="Price" placeholder="Price" />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container> 
        );
    }
}

export default AddItem;
{/**/}

