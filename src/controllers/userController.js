const User = require('../models/user');

module.exports = () => {

  /**
   * POST method
   * Used for user creation (registration)
   */
  app.post('/api/users', (req, res) => {
    User.findOne({ email: req.body.user.email }, (error, user) => {
      // Handle database connection errors
      if (error) return res.status(500).send(error.message);

      // Check if email already exists in the database
      if (user !== null) {
        return res.status(500).send('A user already exists with this email.');
      }

      // Create new user and save to the database
      const newUser = new User(req.body.user);
      newUser.save((error) => {
        if (error) res.status(500).send(error.message);
        return res.send('User created successfully.');
      });
    });
  });
};
