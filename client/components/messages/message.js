import React from 'react';
import CommentInput from '../comments/commentInput';
import CommentList from '../comments/commentList';
import moment from 'moment';
import './message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // comments: []
    };
  }

  render() {
    console.log('message', this.props.message);
    return (
      <div className="post">
        <div className="ui top attached segment">
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src={this.props.message.profilePic}/>
              </a>
              <div className="content">
                <a className="author">{this.props.message.author}</a>
                <br />
                <div className="metadata">
                  <div className="date">{moment(this.props.message.createdAt).fromNow()}</div>
                  <div className="rating">
                    <i className="star icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text">
            {this.props.message.messageText}
          </div>
        </div>
        <div className="ui bottom attached segment">
          {/* <CommentInput authorId={this.props.id} postId={this.props.message.id} fetchComments={this.props.fetchMessageFeed}/>
          <CommentList comments={this.props.message.comments}/> */}
        </div>
      </div>
    );
  }
}
 
export default Message;