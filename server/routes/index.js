const router = require('express').Router();
const account = require('../controllers/account');
const session = require ('../controllers/session');
const team = require ('../controllers/team');
const invite = require ('../controllers/invite');
const messages = require ('../controllers/messages');
const comments = require('../controllers/comments');
const channel = require ('../controllers/channel');
const user = require ('../controllers/user');

router.get('/userSession', session.getSession);
router.get('/logout', session.logout);

router.post('/newAccount', account.createAccount);
router.get('/signIn/:username/:password', account.signIn);

router.get('/team', team.fetchTeam);
router.get('/teamuser/', team.fetchTeamUser);
router.post('/team', team.saveTeam);
router.post('/teamuser', team.saveTeamUser);

router.get('/invite', invite.fetchUserId);
router.post('/invite', invite.addUserToTeam);

router.post('/messageList', messages.saveMessage);
router.get('/messageList', messages.fetchMessages);

router.post('/comments', comments.saveComments);

router.post('/channel', channel.saveChannel);
router.get('/channel', channel.fetchChannels);
router.get('/channelByName', channel.fetchChannelByName);

router.get('/user', user.fetchUser);

module.exports = router;