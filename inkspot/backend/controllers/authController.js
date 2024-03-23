// Example usage in an authentication controller or service
const { comparePasswords } = require('../helpers/passwordUtils');
const User = require('../models/user');

async function authenticateUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    return false; // User not found
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    return false; // Incorrect password
  }

  return true; // Authentication successful
}
