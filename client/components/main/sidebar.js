import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChannelList from './channelList';
import './main.css';
import { Image, Form, Grid, Button } from 'semantic-ui-react';

const SidebarLoose = (props) => (
  <Router>
    <div>
      <div className="ui left fixed vertical menu inverted scrollable">
        <div className="item">
            <h1>loose</h1>
          </div>
          <div className="item">
            <Form className='STARTING-FORM' onSubmit={props.addUserToTeam} >
                <Form.Input name='team name' size={'mini'} placeholder='Username' width={14} onChange={props.onChange} />
                <Button type='submit' size={'mini'}>Invite User to Team</Button>
            </Form>
          </div>
          <Link to="/profile"><a className="header item">{props.username}</a></Link>
          <div className="header item" >CHANNELS</div>
          <div>
            <Form className='STARTING-FORM' onSubmit={props.createChannel} >
                <Form.Input name='createchannel' size={'mini'} placeholder='Channel Name' width={14} onChange={props.onChangeChannel} />
                <Button type='submit' size={'mini'}>Create Channel</Button>
            </Form>
          </div>
          <ChannelList changeChannelId={props.changeChannelId} channels={props.channels}/>
        {/* <div className="header item" >DIRECT MESSAGES</div> */}
        <div className="header item" ></div>
        <Button size={'mini'} onClick={props.logout}>Log out</Button>
        <div className="item" ></div>
        <div>
      </div>
      </div>
      </div>
  </Router>
);

export default SidebarLoose;