const router = require('express').Router();
const account = require('../controllers/account');
const session = require ('../controllers/session');

router.get('/userSession', session.getSession);
router.get('/logout', session.logout);

router.post('/newAccount', account.createAccount);
router.get('/signIn/:username/:password', account.signIn);

module.exports = router;
