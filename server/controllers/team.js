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
                req.session.teamId = data[0].id_team;
          res.send({teamId: data[0].id_team});
        }
      }
  });
}

const saveTeam = (req, res) => {
    console.log('saveTeam ', req.body.teamName)
    db.query('SELECT * FROM teams WHERE team_name = ?', [req.body.teamName], (err, data) => {
      if (err) {
        res.send(err);
      } else {
        console.log('saveteam check for team', data);
        if (!data.length) {
          db.query('INSERT INTO teams (team_name) VALUES (?)', [req.body.teamName], (err, data) => {
            if (err) {
              res.send(err);
            } else {
              console.log('inserted team in db', data);
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
  console.log('saveTeamUser ', req.body.teamId, req.body.userId)
  db.query('INSERT INTO user_team (id_user, id_team) VALUES (?, ?)', [req.body.userId, req.body.teamId], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log('inserted team and user in db', data);
      res.send(data);
    }
  });
}

module.exports.fetchTeam = fetchTeam;
module.exports.fetchTeamUser = fetchTeamUser;
module.exports.saveTeam = saveTeam;
module.exports.saveTeamUser = saveTeamUser;