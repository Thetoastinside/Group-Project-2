const router = require('express').Router();
const { AddressVault } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/address-vault - create a new address entry
router.post('/', withAuth, async (req, res) => {
  try {
    const newAddressVault = await AddressVault.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.status(200).json(newAddressVault);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET /api/address-vault - get all addresses of current user
router.get('/', withAuth, async (req, res) => {
  try {
    const addressVaultData = await AddressVault.findAll({
      where: { user_id: req.session.userId },
    });

    res.status(200).json(addressVaultData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
