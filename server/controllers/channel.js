const db = require('../db');

const saveChannel = function (req, res) {
    console.log('inserting a new channel into db', req.body);
  const channel = req.body;
  db.query('INSERT INTO channels (channel_name, id_team) VALUES (?, ?)',
    [channel.channelName, channel.teamId],
    function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
};

const fetchChannels = function (req, res) {
    db.query('SELECT * FROM channels WHERE id_team = ?', [req.query.teamId], (err, data) => {
        if (err) {
          res.send(err);
        } else {
              console.log('teamd data', data);
              console.log('teamid data2', {teamId: data[0]});
              res.send(data);
        }
    });
};

exports.saveChannel = saveChannel;
exports.fetchChannels = fetchChannels;