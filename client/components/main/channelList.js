import React from 'react';
import underscore from 'underscore';
import { Link } from 'react-router-dom';

const ChannelList = (props) => {
  return (
    <div>
      {props.channels.map((channel, i) => <Link to='/main' onClick={() => props.changeChannelId(channel.id, channel.channel_name)}><a className="item">{channel.channel_name}</a></Link>)}
    </div>
  );
};
export default ChannelList;