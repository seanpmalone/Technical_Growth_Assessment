import React from 'react';
import Comment from './comment';

const CommentList = (props) => {
  return (
    <div>
      {props.comments.map((comment, i) => <Comment comment={comment} key={i} />)}
    </div>
  );
};

export default CommentList;