const db = require('../db');

const fetchTeam = (req, res) => {
  console.log('made it to fetchTeam', req.query.teamNameSearch);
  db.query('SELECT * FROM teams WHERE team_name = ?', [req.query.teamNameSearch], (err, data) => {
    if (err) {
      res.send(err);
    } else {
        console.log('data', data);
      if (!data.length) {
        res.send('team does not exist');
      } else {
          console.log('teamd data', data);
          console.log('teamid data2', {teamId: data[0]});
          res.send({teamId: data[0].id});
        }
    }
});
};

const fetchTeamUser = (req, res) => {
    console.log('fetchTeamUser ', req.query.userId, req.query.teamNameSearch)
    db.query('SELECT * FROM user_team WHERE id_user = ? AND id_team = ?', [req.query.userId, req.query.teamNameSearch], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            console.log('data', data);
            if (!data.length) {
                res.send('user not in team');
            } else {
                console.log('teamid data', data);
                req.session.teamId = data[0].id;
          res.send({teamId: data[0].id_team});
        }
      }
  });
}

module.exports.fetchTeam = fetchTeam;
module.exports.fetchTeamUser = fetchTeamUser;