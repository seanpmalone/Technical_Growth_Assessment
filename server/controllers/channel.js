const db = require('../db');

const saveChannel = function (req, res) {
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
      res.send(data);
    }
  });
};

const fetchChannelByName = function (req, res) {
  db.query('SELECT * FROM channels WHERE channel_name = ? AND id_team = ?', [req.query.channelName, req.query.teamId], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (data.length) {
        res.send('channel already exists');
      } else {
        res.send(data);
      }
    }
  });
};

exports.saveChannel = saveChannel;
exports.fetchChannels = fetchChannels;
exports.fetchChannelByName = fetchChannelByName;