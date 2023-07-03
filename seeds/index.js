const sequelize = require('../config/connection');
const addressVaultData = require('./addressVaultData.json');
const noteVaultData = require('./noteVaultData.json');
const passwordVaultData = require('./passwordVaultData.json');
const userData = require('./userData.json');

const AddressVault = require('../models').AddressVault;
const NoteVault = require('../models').NoteVault;
const PasswordVault = require('../models').PasswordVault;
const User = require('../models').User;

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedPasswordVault();
  console.log('\n----- PASSWORD VAULT SEEDED -----\n');

  await seedNoteVault();
  console.log('\n----- NOTE VAULT SEEDED -----\n');

  await seedAddressVault();
  console.log('\n----- ADDRESS VAULT SEEDED -----\n');

  process.exit(0);
};

const seedUsers = async () => {
  await User.bulkCreate(userData);
};

const seedPasswordVault = async () => {
  await PasswordVault.bulkCreate(passwordVaultData);
};

const seedNoteVault = async () => {
  await NoteVault.bulkCreate(noteVaultData);
};

const seedAddressVault = async () => {
  await AddressVault.bulkCreate(addressVaultData);
};

seedAll();
