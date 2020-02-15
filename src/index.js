import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./componets/App";
import Login from "./componets/Auth/Login";
import Register from "./componets/Auth/Register";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "./firebase";

import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import Spinner from './Spinner';

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setUser, clearUser } from "./actions";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.clearUser()
        this.props.history.push("/login"); 
      }
    });
  }
  render() {
    return this.props.isLoading ? <Spinner /> : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
    isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(connect(mapStateToProps, { setUser, clearUser })(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
