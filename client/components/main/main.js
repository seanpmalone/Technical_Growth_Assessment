//Mostly a blank page and side bar with a message "Click a channel or dm to get started!"
import React from 'react';
import axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from '../signIn/signin';
import SidebarLoose from './sidebar';
import MessageInput from '../messages/messageInput';
import MessageList from '../messages/messageList';
import { Sidebar } from 'semantic-ui-react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteUsername: '',
      createChannel: '',
      channelId: '',
      dmId: '',
      channels: [],
      channelName: 'General',
      dms: [],
      messages: [],
      username: '',
      profilePic: '',
      fullName: ''
    };
    this.onChangeInvite = this.onChangeInvite.bind(this);
    this.addUserToTeam = this.addUserToTeam.bind(this);
    this.fetchChannelList = this.fetchChannelList.bind(this);
    this.fetchMessageFeed = this.fetchMessageFeed.bind(this);
    this.changeChannelId = this.changeChannelId.bind(this);
    this.onChangeCreateChannel = this.onChangeCreateChannel.bind(this);
    this.createChannel = this.createChannel.bind(this);
    console.log('RENDERING MAIN', this.props);
  }

  componentDidMount() {
    console.log('RENDERING MAIN');
    this.fetchChannelList();
    this.fetchUserInfo();
    this.fetchMessageFeed();

  }

  onChangeInvite(e) {
    this.setState({
      inviteUsername: e.target.value
    });
  }

  addUserToTeam(event) {
    var inviteThis = this;
    axios.get('/invite', {
      params: {
        inviteUsername: inviteThis.state.inviteUsername
      }
    })
      .then(response => {
        if (response.data === 'user does not exist') {
          alert('Sorry, but the user ' + inviteThis.state.inviteUsername + ' does not exist.');
        } else {
          console.log('got user info from db for invite', response.data);
          axios.post('/invite', {
              inviteUserId: response.data.userId,
              teamId: inviteThis.props.teamId
          })
          .then(response => {
            alert('Success! ' + inviteThis.state.inviteUsername + ' was added to the team!');
          })
        }
      })
      .catch(err => {
        console.log('Error from addUserToTeam', err);
      });
    event.preventDefault();
  }

  fetchUserInfo() {
    var thisIndex = this;
    axios.get('/user', {
      params: {
        userId: thisIndex.props.userId
      }
      })
      .then(function (response) {
        thisIndex.setState({
          username: response.data[0].username,
          profilePic: response.data[0].profilePic,
          fullName: response.data[0].fullName
        }, function() {this.fetchMessageFeed();});
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  fetchChannelList() {
    let thisIndex = this;
    axios.get('/channel', {
      params: {
        teamId: thisIndex.props.teamId
      }
      })
      .then(function (response) {
        console.log('jfn jfv',response);
        thisIndex.setState({
          channels: response.data,
          channelId: response.data[0].id
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  fetchMessageFeed() {
    let thisIndex = this;
    axios.get('/messageList', {
      params: {
        channelId: thisIndex.state.channelId
      }
      })
      .then(function (response) {
        console.log('message response data', response.data);
        thisIndex.setState({
          messages: response.data
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  changeChannelId(newChannelId, newChannelName) {
    console.log('change channel id', newChannelId);
    this.setState({
      channelId: newChannelId,
      channelName: newChannelName

    }, function() {this.fetchMessageFeed();});
    console.log('after change channel id', this.state.channelId);
  }

  onChangeCreateChannel(e) {
    this.setState({
      createChannel: e.target.value
    });
  }

  createChannel(event) {
    // realized that you won't be able to create a channel with the same name as a channel in another team
    // will have to add a teamId parameter to the get request to prevent this from happening
    var channelThis = this;
    axios.get('/channelByName', {
      params: {
        channelName: channelThis.state.createChannel
      }
    })
      .then(response => {
        if (response.data === 'channel already exists') {
          alert('Sorry, but the channel ' + channelThis.state.createChannel + ' already exists.');
        } else {
          console.log('got user info from db for channel creation', response.data);
          axios.post('/channel', {
              channelName: channelThis.state.createChannel,
              teamId: channelThis.props.teamId
          })
          .then(response => {
            this.fetchChannelList();
          })
        }
      })
      .catch(err => {
        console.log('Error from addUserToTeam', err);
      });
    event.preventDefault();
  }

  render() {
    console.log('channels',this.state.channels);
    if (!!!this.props.userId || !!!this.props.teamId) {
      return (
        <Redirect to={'/'}/>
      );
    }
    return (
      <div>
      <div>
        <SidebarLoose username={this.state.username} channels={this.state.channels} dms={this.state.dms} logout={this.props.logout} addUserToTeam={this.addUserToTeam} onChange={this.onChangeInvite.bind(this)} changeChannelId={this.changeChannelId} createChannel={this.createChannel} onChangeChannel={this.onChangeCreateChannel.bind(this)}/>
      </div>
      <div className='pusher'>
      <div className="ui top attached segment header">Channel: {this.state.channelName}</div>
      <MessageInput id={this.props.userId} channelId={this.state.channelId} dmId={this.state.dmId} fetchMessageFeed={this.fetchMessageFeed}/>
      <MessageList id={this.props.userId} messages={this.state.messages} fetchMessageFeed={this.state.fetchMessageFeed}/>
    </div>
    </div>
    );
  }
}

export default Main;