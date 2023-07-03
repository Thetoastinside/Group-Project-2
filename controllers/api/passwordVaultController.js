const router = require('express').Router();
const { PasswordVault } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/password-vault - create a new password entry
router.post('/', withAuth, async (req, res) => {
  try {
    const newPasswordVault = await PasswordVault.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.status(200).json(newPasswordVault);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET /api/password-vault - get all passwords of current user
router.get('/', withAuth, async (req, res) => {
  try {
    const passwordVaultData = await PasswordVault.findAll({
      where: { user_id: req.session.userId },
    });

    res.status(200).json(passwordVaultData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
