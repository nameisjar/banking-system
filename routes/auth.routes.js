const router = require('express').Router();
const { register, login, whoami } = require('../controllers/auth.controllers');
const { restrict } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/whoami', restrict, whoami);

module.exports = router;