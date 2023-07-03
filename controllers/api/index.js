const router = require('express').Router();

const userRoutes = require('./userVaultController');
const passwordVaultRoutes = require('./passwordVaultController');
const noteVaultRoutes = require('./noteVaultController');
const addressVaultRoutes = require('./addressVaultController');

router.use('/users', userRoutes);
router.use('/password-vault', passwordVaultRoutes);
router.use('/note-vault', noteVaultRoutes);
router.use('/address-vault', addressVaultRoutes);

module.exports = router;
