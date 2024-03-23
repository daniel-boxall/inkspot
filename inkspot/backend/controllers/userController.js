// Example usage in a user controller or service
const { hashPassword } = require('../helpers/passwordUtils');
const User = require('../models/user');

async function createUser(username, password) {
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
}
