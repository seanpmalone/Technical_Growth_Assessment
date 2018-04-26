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
      messages: [],
      friends: [],
      potentialFriends: [],
      currentPage: 'homepage', //update this to whatever is first loaded
      wallId: this.props.id,
      profileInfo: {
        username: '',
        work: '',
        join: '',
        extra: '',
        profilePic: '',
        vodka: '',
        status: '',
      }
    };
    this.fetchPostFeed = this.fetchPostFeed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setWallId = this.setWallId.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.setProfileInfo = this.setProfileInfo.bind(this);
  }

  componentDidMount() {
    this.fetchPostFeed();
    this.getUserProfile();
  }

  setProfileInfo(key, value) {
    console.log('key value: ', key, value);
    let profileInfo = this.state.profileInfo;
    profileInfo[key] = value;
    this.setState({profileInfo});
  }

  setWallId(id) {
    this.setState({
      wallId: id
    });
    console.log('from main', this.state.wallId);
    this.fetchPostFeed(id);
    this.getUserProfile(id);
  }

  handleChange(obj) {
    this.setState({
      friends: obj.data.filter((data) => {
        return (data.id !== this.props.id && data.is_my_friend === '1');
      }),
      potentialFriends: obj.data.filter((data) => {
        return (data.id !== this.props.id && data.is_my_friend === '0');
      })
    });
  }

  fetchUsersInfo() {
    axios.get(`/render/wall/${this.state.wallId}`)
      .then( response => {
        console.log('RESPONSE FROM MAIN.JS ', response);
      })
      .catch( err => {
        console.log('Error from main.js', err);
      });
  }

  fetchPostFeed(wallId = this.state.wallId) {
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
  
  changePage(page) {
    this.setState({
      currentPage: page,
    });
  }

  getUserProfile(wallId = this.state.wallId) {
    axios.get(`/userProfileInfo/${wallId}`)
      .then( response => {
        console.log('getuserprofile:', response);
        let profileInfo = Object.assign({}, this.state.profileInfo); //creating copy of object
        profileInfo.username = response.data.username;
        profileInfo.work = response.data.work;
        profileInfo.join = response.data.join;
        profileInfo.extra = response.data.extra;
        profileInfo.profilePic = response.data.profilePic;
        if (response.data.vodka !== null) {
          profileInfo.vodka = response.data.vodka;
        } else {
          profileInfo.vodka = 'Vodka Consumption';
        }

        if (response.data.status !== null) {
          profileInfo.status = response.data.status;
        } else {
          profileInfo.status = 'Status';
        }
        this.setState({profileInfo});
      })
      .catch( err => {
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