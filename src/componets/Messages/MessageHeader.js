import React, { Component } from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import { CompactPicker } from "react-color";

class MessageHeader extends Component {
  render() {
    return (
      <Segment clearing>
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            Channel
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>2 Users</Header.Subheader>
        </Header>
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessageHeader;
