const router = require('express').Router();
const { User, PasswordVault, NoteVault, AddressVault } = require('../models');
const withAuth = require('../utils/auth');

// Render home page
router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      
      include: [
        {
          model: PasswordVault,
        },
        {
          model: NoteVault,
        },
        {
          model: AddressVault,
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      user,
      logged_in: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// Render signup page
router.get('/signup', (req, res) =>{
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;