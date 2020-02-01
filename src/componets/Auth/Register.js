import React, { Component } from "react";
import { Grid, Form, Segment, Button, Header, Icon } from "semantic-ui-react";

class Register extends Component {
  render() {
    return (
        <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{maxWidth: 450}}>
                <Header as="h2" icon color="orange" text="center">
                    <Icon name="puzzle piece" color="orange" />
                    Register for DevChat
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" type="text"/>
                        <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" type="text"/>
                        <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" type="text"/>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>    
    )
  }
}

export default Register;
