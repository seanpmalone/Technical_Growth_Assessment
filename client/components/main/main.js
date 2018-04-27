//Mostly a blank page and side bar with a message "Click a channel or dm to get started!"
import React from 'react';
import axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from '../signIn/signin';
import SidebarExample from './sidebar';
import { Sidebar } from 'semantic-ui-react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteUsername: ''
    };
    this.onChangeInvite = this.onChangeInvite.bind(this);
    this.addUserToTeam = this.addUserToTeam.bind(this);
    this.fetchChannelFeed = this.fetchChannelFeed.bind(this);
    this.fetchDMFeed = this.fetchDMFeed.bind(this);
    console.log('RENDERING MAIN');
  }

  componentDidMount() {
    console.log('RENDERING MAIN');

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
          alert('Sorry, but the user ' + teamThis.state.inviteUsername + ' does not exist.');
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


  fetchChannelFeed(channelID) {
    let thisIndex = this;
    axios.get('/postFeed/' + wallId)
      .then(function (response) {
        thisIndex.setState({
          messages: response.data || []
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  fetchDMFeed(channelID) {
    let thisIndex = this;
    axios.get('/postFeed/' + wallId)
      .then(function (response) {
        thisIndex.setState({
          messages: response.data || []
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    if (!!!this.props.userId || !!!this.props.teamId) {
      return (
        <Redirect to={'/'}/>
      );
    }
    return (
      <div>
        <SidebarExample logout={this.props.logout} addUserToTeam={this.addUserToTeam} onChange={this.onChangeInvite.bind(this)}/>
      </div>
    );
  }
}

export default Main;