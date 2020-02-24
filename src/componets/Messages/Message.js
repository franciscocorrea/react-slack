import React, { Component, Fragment } from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";

class Message extends Component {
  state = {
    messageRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser
  };
  render() {
    const { messageRef, channel, user } = this.state;
    return (
      <Fragment>
        <MessageHeader />
        <Segment>
          <Comment.Group className="messages">{/* Messages */}</Comment.Group>
        </Segment>

        <MessageForm messageRef={messageRef} currentChannel={channel} currentUser={user}/>
      </Fragment>
    );
  }
}

export default Message;
