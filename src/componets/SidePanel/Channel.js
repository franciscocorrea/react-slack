import React, { Component, Fragment } from "react";
import firebase from "../../firebase";
import { Menu, Icon, Form, Input, Button, Modal } from "semantic-ui-react";

class Channel extends Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetail: "",
    channelsRef: firebase.database().ref("channels"),
    modal: false
  };

  componentDidMount() {
    this.addListeners();
  }

  addListeners = () => {
    let loadedChannels = [];

    this.state.channelsRef.on("child_added", snap => {
      loadedChannels.push(snap.val());
      console.log(loadedChannels);
      this.setState({ channels: loadedChannels });
    });
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetail, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetail,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  isFormValid = ({ channelName, channelDetail }) =>
    channelName && channelDetail;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onpenModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => console.log(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}>
        # {channel.name}
      </Menu.Item>
    ));

  render() {
    const { channels, modal } = this.state;

    return (
      <Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" />
              CHANNELS
            </span>{" "}
            ({channels.length}){" "}
            <Icon
              name="add"
              onClick={this.onpenModal}
              style={{ cursor: "pointer" }}
            />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetail"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
            <Modal.Actions style={{ marginTop: "2em" }}>
              <Button color="green" inverted onClick={this.handleSubmit}>
                <Icon name="checkmark" /> Add
              </Button>
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

export default Channel;
