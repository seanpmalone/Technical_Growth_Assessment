const db = require('../db');

const fetchTeam = (req, res) => {
  db.query('SELECT * FROM teams WHERE team_name = ?', [req.query.teamNameSearch], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (!data.length) {
        res.send('team does not exist');
      } else {
        res.send({ teamId: data[0].id });
      }
    }
  });
};

const fetchTeamUser = (req, res) => {
  db.query('SELECT * FROM user_team WHERE id_user = ? AND id_team = ?', [req.query.userId, req.query.teamNameSearch], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (!data.length) {
        res.send('user not in team');
      } else {
        req.session.teamId = data[0].id_team;
        res.send({ teamId: data[0].id_team });
      }
    }
  });
}

const saveTeam = (req, res) => {
  db.query('SELECT * FROM teams WHERE team_name = ?', [req.body.teamName], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (!data.length) {
        db.query('INSERT INTO teams (team_name) VALUES (?)', [req.body.teamName], (err, data) => {
          if (err) {
            res.send(err);
          } else {
            req.session.teamId = data.insertId;
            res.send(data);
          }
        });
      } else {
        res.send('team already exists');
      }
    }
  });
}

const saveTeamUser = (req, res) => {
  db.query('INSERT INTO user_team (id_user, id_team) VALUES (?, ?)', [req.body.userId, req.body.teamId], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
}

module.exports.fetchTeam = fetchTeam;
module.exports.fetchTeamUser = fetchTeamUser;
module.exports.saveTeam = saveTeam;
module.exports.saveTeamUser = saveTeamUser;