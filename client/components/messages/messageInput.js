import React from 'react';
import axios from 'axios';
import Socketio from 'socket.io-client';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.socket = Socketio('http://localhost:3000');
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    console.log('props in message input', this.props);
  }

  componentDidMount () {
    var component = this;
    this.socket.on('returnmessage', function(message) {
      console.log('message fom socket server', message);
      component.props.fetchMessageFeed();
    });
  }

  onChangeMessage (event) {
    this.setState({
      content: event.target.value
    });
  }

  submitMessage(event) {
    var component = this;
    event.preventDefault();
    this.socket.emit('message', {
      messageText: this.state.content,
      userId: component.props.id,
      channelId: component.props.channelId
    });
    axios.post('/messageList', {
      messageText: this.state.content,
      userId: component.props.id,
      channelId: component.props.channelId
    }).then(function(response) {
      console.log('saved message to db', response.data);
      component.setState({
        content: ''
      });
      component.props.fetchMessageFeed();
    });
  }

  render() {
    return (<div className= "ui segment">
      <form className="ui form">
        <div className="field">
          <label>Message</label>
          <textarea placeholder="Write something snazzy" rows="1" value={this.state.content} onChange={this.onChangeMessage}>
          </textarea>
        </div>
        <div className="field">
          <button className="ui button" role="button" onClick={this.submitMessage}>Post</button>
        </div>
      </form>
    </div>);
  }
}

export default MessageInput;