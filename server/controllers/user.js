const db = require('../db');

const fetchUser = function (req, res) {
  db.query('SELECT * FROM users WHERE id = ?', [req.query.userId], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

exports.fetchUser = fetchUser;