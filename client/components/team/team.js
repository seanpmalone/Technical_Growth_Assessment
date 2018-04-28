import React from 'react';
import { Redirect, Link, Switch, Route } from 'react-router-dom';
import { Image, Form, Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
import './team.css';

const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));


class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamNameSearch: '',
      teamNameCreate: ''
    };
    this.searchForTeam = this.searchForTeam.bind(this);
    this.createTeam = this.createTeam.bind(this);
  }

  onChangeSearch(e) {
    this.setState({
      teamNameSearch: e.target.value
    });
  }

  onChangeCreate(e) {
    this.setState({
      teamNameCreate: e.target.value
    });
  }

  searchForTeam(event) {
    var teamThis = this;
    var teamIdFromSearch = '';
    axios
      .get('/team', {
        params: {
          teamNameSearch: teamThis.state.teamNameSearch
        }
      })
      .then(response => {
        if (response.data === 'team does not exist') {
          alert('Sorry, but a team with the name ' + teamThis.state.teamNameSearch + ' does not exist yet.');
        } else {
          teamIdFromSearch = response.data.teamId;
          axios.get('/teamuser', {
            params: {
              teamNameSearch: teamIdFromSearch,
              userId: teamThis.props.id
            }
          })
            .then(response => {
              if (response.data === 'user not in team') {
                alert('Sorry, the team exists, but you have not been invited to it.');
              } else {
                teamThis.props.setTeam(response.data.teamId);
              }
            })
        }
      })
      .catch(err => {
        console.log('Error from searchForTeam', err);
      });
    event.persist();
  }

  createTeam(event) {
    var teamThis = this;
    axios
      .post('/team', {
        teamName: teamThis.state.teamNameCreate
      })
      .then(response => {
        if (response.data === 'team already exists') {
          alert('Sorry, but a team with that name already exists.');
        } else {
          var newTeamId = response.data.insertId;
          axios.post('/teamuser', {
            teamId: newTeamId,
            userId: teamThis.props.id
          })
            .then(response => {
              axios.post('/channel', {
                teamId: newTeamId,
                channelName: 'General'
              })
            })
            .then(response => {
              teamThis.props.setTeam(newTeamId);
            })
        }
      })
      .catch(err => {
        console.log('Error from searchForTeam', err);
      });
    event.preventDefault();
  }

  render() {
    if (!!this.props.teamId) {
      return (
        <Switch>
          <Redirect to={'/main'} />
        </Switch>
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
                <Grid.Column width={2} className='logout-button'>
                  <Button floated='right' size={'mini'} onClick={this.props.logout}>Log out</Button>
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </header>
        <div>
          <Grid>
            <Grid.Column width={8} className='left-side-Login' >
              <div className='left-picture' >
                <Image src='https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8a1cc8640707.56338041d9d6c.png' size='massive' rounded />
              </div>
            </Grid.Column>
            <Grid.Column width={8} >
              <Form className='STARTING-FORM' onSubmit={this.searchForTeam} >
                <Grid.Row className='create-account'>
                  <p className='splash'>Join your team</p>
                </Grid.Row>
                <Grid.Row className='full-name-row'>
                  <Form.Input name='team name' size={'small'} placeholder='Team Name' width={14} onChange={this.onChangeSearch.bind(this)} />
                </Grid.Row>
                <Grid.Row className='create-account'>
                  <Button type='submit'>Search Teams</Button>
                </Grid.Row>
              </Form>
              <Form className='user-login' onSubmit={this.createTeam} >
                <Grid.Row className='create-account'>
                  <p className='splash'>...or create one</p>
                </Grid.Row>
                <Grid.Row className='full-name-row'>
                  <Form.Input name='team name' size={'small'} placeholder='Team Name' width={6} onChange={this.onChangeCreate.bind(this)} />
                </Grid.Row>
                <Grid.Row className='create-account'>
                  <Button type='submit'>Create Team</Button>
                </Grid.Row>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Team;