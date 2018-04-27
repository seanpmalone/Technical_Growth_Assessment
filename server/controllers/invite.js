const db = require('../db');

const fetchUserId = (req, res) => {
    console.log('made it to fetchuserid', req.query.inviteUsername);
    db.query('SELECT * FROM users WHERE username = ?', [req.query.inviteUsername], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            console.log('data', data);
            if (!data.length) {
                res.send('user does not exist');
            } else {
                console.log('user data from invite', data);
                res.send({userId: data[0].id});
            }
        }
    });
};

const addUserToTeam = (req, res) => {
    console.log('saveTeamUser all body', req.body)
  console.log('saveTeamUser ', req.body.teamId, req.body.inviteUserId)
  db.query('INSERT INTO user_team (id_user, id_team) VALUES (?, ?)', [req.body.inviteUserId, req.body.teamId], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log('inserted team and user in db', data);
      res.send(data);
    }
  });
}

module.exports.fetchUserId = fetchUserId;
module.exports.addUserToTeam = addUserToTeam;