const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/user - get current logged in user
router.get('/', withAuth, async (req, res) => {
    console.log(req.session)
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
    });

    res.json(userData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// POST /api/user - create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
        console.log(req.session)
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST /api/user/login - authenticate a user and start a session
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password.' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/user/logout - end the session (log out)
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
