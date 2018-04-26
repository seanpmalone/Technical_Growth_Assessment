const router = require('express').Router();
const account = require('../controllers/account');
const session = require ('../controllers/session');
const team = require ('../controllers/team');

router.get('/userSession', session.getSession);
router.get('/logout', session.logout);

router.post('/newAccount', account.createAccount);
router.get('/signIn/:username/:password', account.signIn);

router.get('/team', team.fetchTeam);
router.get('/teamuser/', team.fetchTeamUser);
// router.post('/team', team.saveTeam);
// router.post('/teamuser', team.saveTeamUser);

module.exports = router;
