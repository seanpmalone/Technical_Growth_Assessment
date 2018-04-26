//Mostly a blank page and side bar with a message "Click a channel or dm to get started!"
import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../signIn/signin';
import SidebarExample from './sidebar';
import { Sidebar } from 'semantic-ui-react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.id,
      teamId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchChannelFeed = this.fetchChannelFeed.bind(this);
    this.fetchDMFeed = this.fetchDMFeed.bind(this);
    console.log('RENDERING MAIN');
  }

  componentDidMount() {
    console.log('RENDERING MAIN');

  }

  chosenTeam() {
    return !!this.state.teamId;
  }

  setTeam(teamId) {
    this.setState({teamId: teamId});
  }

  handleChange(obj) {
    //change this into on change for channel/dm search
    this.setState({
      friends: obj.data.filter((data) => {
        return (data.id !== this.props.id && data.is_my_friend === '1');
      }),
      potentialFriends: obj.data.filter((data) => {
        return (data.id !== this.props.id && data.is_my_friend === '0');
      })
    });
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
    return (
      <div>
        <SidebarExample />
      </div>
    );
  }
}

export default Main;