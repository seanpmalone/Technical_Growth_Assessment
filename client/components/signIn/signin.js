import React from 'react'; 
import {Redirect, Link} from 'react-router-dom';
import { Image, Form, Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
import './signin.css';


class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      fullName: '',
      newUsername: '',
      newPassword: ''
    };
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  userAllInputFieldsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCreateAccount(event) {
    bcrypt.genSaltAsync(10) 
      .then(salt => {
        bcrypt.hashAsync(this.state.newPassword, salt, null)
          .then(hashedPassword => {
            const newUserInfo = {
              fullName: this.state.fullName,
              newUsername: this.state.newUsername,
              newPassword: hashedPassword,
              profilePicture:
                'https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8a1cc8640707.56338041d9d6c.png'
            };
            let component = this;
            console.log('before axios req', newUserInfo);
            axios
              .post('/newAccount', newUserInfo)
              .then(response => {
                if (response.data === 'exists') {
                  alert('Username is taken! Choose a new one.');
                } else if (response.data.id) {
                    console.log('back from db', component.props);
                  component.props.setAuth(response.data.id);
                }
              })
              .catch(err => {
                console.log('Error from handleCreateAccount', err);
              });
            event.preventDefault();
          });
      });
  }

  handleLogin(event) {
    let component = this;
    console.log('FROM LOGIN.JSX', this.state.username);
    axios
      .get(`/signIn/${this.state.username}/${this.state.password}`)
      .then(response => {
        if (response.data === 'wrong') {
          alert('Wrong username or password!');
        } else {
          component.props.setAuth(response.data.id);
          console.log('logged in and state updated!');
        }
      })
      .catch(err => {
        console.log('Error from handleLogin', err);
      });
    event.preventDefault();
  }

  render() {
    console.log('render sign in page, are we logged in?',!!this.props.userId);
    if (!!this.props.userId) {
      return (
        <Redirect to={'/'}/>
      );
    }
    return (
      <div>
        <header className='login-header' >
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form>
                  <Form.Field inline>
                  <Link className='name header' to={'/'}>loose</Link>
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form className='user-login' onSubmit={this.handleLogin} >
                  <Form.Group >
                    <Form.Input name='username' size={'small'} placeholder='username' width={6} onChange={this.userAllInputFieldsChange.bind(this)} />
                    <Form.Input name='password' size={'small'} type='password' placeholder='password' autoComplete='off' width={6} onChange={this.userAllInputFieldsChange.bind(this)} />
                    <Button type='submit'>Login</Button>
                  </Form.Group>
                </Form> 
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </header>
        <div>
          <Grid>
            <Grid.Column width={8} className='left-side-Login' >
              <div className='left-picture' >
                <Image src='https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8a1cc8640707.56338041d9d6c.png' size='massive' rounded/>
              </div>
            </Grid.Column>
            <Grid.Column width={8} >
              <Form className='STARTING-FORM' onSubmit={this.handleCreateAccount} > 
                <Grid.Row className='create-account'>
                  <p className='splash'>Let's get into it</p>
                </Grid.Row>
                <Grid.Row className='full-name-row'>
                  <Form.Input name='fullName' size={'small'} placeholder='Full name' width={14} onChange={this.userAllInputFieldsChange.bind(this)}/>
                </Grid.Row>
                <Grid.Row className='new-username-password'>
                  <Form.Group>
                    <Form.Input name='newUsername' size={'small'} placeholder='New username ' width={7} onChange={this.userAllInputFieldsChange.bind(this)} />
                    <Form.Input name='newPassword' size={'small'} placeholder='New password ' type='password' autoComplete='off' width={7} onChange={this.userAllInputFieldsChange.bind(this)} />
                  </Form.Group>
                </Grid.Row>
                <Grid.Row className='agree-terms'>
                  <Form.Checkbox
                    inline
                    label='I agree to the terms and conditions'
                    required />
                </Grid.Row>
                <Grid.Row className='info'>
                  <Grid.Column width={2}>
                    <h6>
            * By clicking Create Account, you agree to our Terms and that you have read our 
            Data Policy, including our Cookie Use. You may receive SMS Notifications from 
            loose and can opt out at any time.
                    </h6>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className='create-account'>
                  <Button type='submit'>Create Account</Button>
                </Grid.Row>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  } 
}

export default SignIn;