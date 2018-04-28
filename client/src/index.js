import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import SidebarExample from '../components/main/sidebar';
import Main from '../components/main/main';
import SignIn from '../components/signIn/signin';
import Team from '../components/team/team';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      teamId: '',
      hasSession: false
    };
    this.setAuth = this.setAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.getSessionId();
  }

  getSessionId() {
    axios
      .get('/userSession')
      .then(response => {
        if (response.data.id) {
          this.setState({
            id: response.data.id,
            teamId: response.data.teamId,
            hasSession: true
          });
        } else {
          this.setState({
            hasSession: true
          });
        }
      })
      .catch(err => {
        console.log('Error getting session id', err);
      });
  }

  logout() {
    axios.get('/logout')
      .catch(err => {
        console.log('Error on logout:', err);
      });
    this.setState({ id: '', teamId: '' });
  }

  isAuthenticated() {
    return !!this.state.id;
  }

  isInTeam() {
    return !!this.state.teamId;
  }

  chosenTeam() {
    return !!this.state.teamId;
  }

  setAuth(id) {
    this.setState({ id: id });
  }

  setTeam(teamId) {
    this.setState({ teamId: teamId });
  }

  render() {
    let component = this;
    if (!this.state.hasSession) {
      return (
        <div>Waiting for server</div>
      );
    }
    return (
      <main>
        <Switch>
          <Route exact path='/' render={() => <Redirect to={{ pathname: '/team' }} />} />
          <Route path='/team' render={() => (component.isAuthenticated() ?
            (<Team id={this.state.id} teamId={this.state.teamId} logout={this.logout} setTeam={(teamId) => component.setTeam(teamId)} />)
            : (<Redirect to={{
              pathname: '/signin',
              state: { from: component.location }
            }} />)
          )} />
          <Route path='/signin' render={() => <SignIn userId={this.state.id} setAuth={(id) => component.setAuth(id)} />} />
          <Route path='/main' render={() => <Main userId={this.state.id} teamId={this.state.teamId} logout={this.logout} />} />
        </Switch>
      </main>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));