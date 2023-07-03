const User = require('./user');
const PasswordVault = require('./passwordVault');
const NoteVault = require('./noteVault');
const AddressVault = require('./addressVault');

// Define associations here

// Assuming each vault belongs to a single user:
PasswordVault.belongsTo(User, {
  foreignKey: 'user_id',
});

NoteVault.belongsTo(User, {
  foreignKey: 'user_id',
});

AddressVault.belongsTo(User, {
  foreignKey: 'user_id',
});

// And a user can have multiple vaults:
User.hasMany(PasswordVault, {
  foreignKey: 'user_id',
});

User.hasMany(NoteVault, {
  foreignKey: 'user_id',
});

User.hasMany(AddressVault, {
  foreignKey: 'user_id',
});

module.exports = { User, PasswordVault, NoteVault, AddressVault };
