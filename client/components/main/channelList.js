import React from 'react';
import underscore from 'underscore';
import { Link } from 'react-router-dom';

//load message feed from mountcomponent as main loads using the current channel id
// each link here will have an onclick function that sets the state of main's channel to whatever their id is
// it will rerender the feed with the new messages

const ChannelList = (props) => {
  return (
    <div>
      {props.channels.map((channel, i) => <Link to='/main' onClick={() => props.changeChannelId(channel.id, channel.channel_name)}><a className="item">{channel.channel_name}</a></Link>)}
    </div>
  );
};
export default ChannelList;