const db = require('../db');

const saveMessage = function (req, res) {
  const message = req.body;
  db.query('INSERT INTO messages (message_text, id_author, id_channel, id_dm) VALUES (?, ?, ?, ?)',
    [message.messageText, message.userId, message.channelId, message.dmId],
    function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
};

const fetchMessages = function (req, res) {
  db.query('SELECT messages.id, message_text, messages.created_at, users.full_name, users.profile_picture FROM messages ' +
    'INNER JOIN users ON users.id = messages.id_author ' +
    'WHERE id_channel = ? ' +
    'ORDER BY messages.created_at DESC', [req.query.channelId], function (err, postData) {
      if (err) {
        res.send(err);
      } else {
        res.send(
          postData.map(row => {
            return {
              id: row.id,
              messageText: row.message_text,
              createdAt: row.created_at,
              author: row.full_name,
              profilePic: row.profile_picture,
              // comments: comments[row.id] || []
            };
          })
        );
      }
    });
};

// const fetchMessages = function (req, res) {
//   console.log('beginning', req.params);
//   db.query('SELECT messages.id, message_text, messages.created_at, users.full_name, users.profile_picture FROM messages ' +
//   'INNER JOIN users ON users.id = messages.id_author ' +
//   'WHERE id_channel = ? ' +
//   'ORDER BY messages.created_at DESC', [req.params.channelId], function (err, postData) {
//   if (err) {
//     res.send(err);
//   } else {
//     const postIds = postData.map(row => row.id);
//     console.log('comments', postIds);
//     db.query('SELECT id_post, text_comment, comments.created_at, users.full_name, users.profile_picture FROM comments ' +
//       'INNER JOIN users ON id_author = users.id ' +
//       'WHERE id_post IN ? ORDER BY comments.created_at DESC',
//     [[postIds]], function (err, commentData) {
//       if (err) {
//         res.send(err);
//       } else {
//         let comments = {};
//         commentData.forEach(comment => {
//           comments[comment.id_post] = comments[comment.id_post] || [];
//           comments[comment.id_post].push({
//             textComment: comment.text_comment,
//             createdAt: comment.createdAt,
//             author: comment.full_name,
//             profilePic: comment.profile_picture
//           });
//         });
//         res.send(
//           postData.map(row => {
//             return {
//               id: row.id,
//               postText: row.post_text,
//               createdAt: row.created_at,
//               author: row.full_name,
//               profilePic: row.profile_picture,
//               comments: comments[row.id] || []
//             };
//           })
//         );
//       }
//     });
//   }
// });
// };

exports.saveMessage = saveMessage;
exports.fetchMessages = fetchMessages;