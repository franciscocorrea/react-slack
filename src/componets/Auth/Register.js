import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from "md5";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users")
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleInputError = (errors, input) => {
    return errors.some(error => error.message.toLowerCase().includes(input))
      ? "error"
      : "";
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all  fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, repeatPassword }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !repeatPassword.length
    );
  };

  isPasswordValid = ({ password, repeatPassword }) => {
    if (password.length < 6 || repeatPassword.length < 6) {
      return false;
    } else if (password !== repeatPassword) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors =>
    errors.map((error, index) => <p key={index}>{error.message}</p>);

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({
        errors: [],
        loading: true
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCreated => {
          userCreated.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                userCreated.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(userCreated)
                .then(() => {
                  console.log("user saved");
                  this.setState({
                    loading: false,
                    username: "",
                    email: "",
                    password: "",
                    repeatPassword: ""
                  });
                })
                .catch(error => {
                  console.error(error);
                  this.setState({
                    errors: this.state.errors.concat(error),
                    loading: false
                  });
                });
            });
        })
        .catch(error => {
          this.setState({
            errors: this.state.errors.concat(error),
            loading: false
          });
        });
    }
  };
  render() {
    const {
      username,
      email,
      password,
      repeatPassword,
      errors,
      loading
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" text="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                className={this.handleInputError(errors, "username")}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="text"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
              />
              <Form.Input
                fluid
                name="repeatPassword"
                icon="repeat"
                iconPosition="left"
                placeholder="Repeat Password"
                onChange={this.handleChange}
                value={repeatPassword}
                className={this.handleInputError(errors, "password")}
                type="password"
              />
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already User?<Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
