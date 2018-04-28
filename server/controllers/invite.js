const db = require('../db');

const fetchUserId = (req, res) => {
  db.query('SELECT * FROM users WHERE username = ?', [req.query.inviteUsername], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (!data.length) {
        res.send('user does not exist');
      } else {
        res.send({ userId: data[0].id });
      }
    }
  });
};

const addUserToTeam = (req, res) => {
  db.query('INSERT INTO user_team (id_user, id_team) VALUES (?, ?)', [req.body.inviteUserId, req.body.teamId], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
}

module.exports.fetchUserId = fetchUserId;
module.exports.addUserToTeam = addUserToTeam;