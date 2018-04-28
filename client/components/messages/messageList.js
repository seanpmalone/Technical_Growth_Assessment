import React from 'react';
import Message from './message.js';

const MessageList = (props) => {
  return (
    <div>
      {props.messages.map((message, i) => <Message id={props.id} message={message} key={i} fetchMessageFeed={props.fetchMessageFeed} />)}
    </div>
  );
};
export default MessageList;