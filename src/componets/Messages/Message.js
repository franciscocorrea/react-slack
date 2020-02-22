import React, { Component, Fragment } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm"

class Message extends Component {
  render() {
    return (
      <Fragment>
        <MessageHeader />
        <Segment>
          <Comment.Group className="messages">{/* Messages */}</Comment.Group>
        </Segment>

        <MessageForm />

      </Fragment>
    );
  }
}

export default Message;
