import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import SidebarExample from '../components/main/sidebar';
import Main from '../components/main/main';
import SignIn from '../components/signIn/signin';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
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
            hasSession: true
          });
          console.log('session state set',this.state);
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
    this.setState({id: ''});
  }

  isAuthenticated() {
      console.log('authenticated, about to redirect', !!this.state.id);
    return !!this.state.id;
  }

  setAuth(id) {
    this.setState({id: id});
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
          <Route exact path ='/' render={() => <Redirect to={{ pathname: '/main'}}/>}/>
          <Route path='/main' render={() => (component.isAuthenticated() ?
            (<Main id={this.state.id} logout={this.logout}/>)
            : (<Redirect to={{
              pathname: '/signin',
              state: { from: component.location}}}/>)
          )}/>
          <Route exact path='/signin' render={() => <SignIn setAuth={(id) => component.setAuth(id)}/>} />
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