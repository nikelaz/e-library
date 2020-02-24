const User = require('../models/user');

module.exports = () => {
  app.post('/api/users', (req, res, next) => {
    User.findOne({ email: req.body.user.email }, (error, user) => {
      if (error) return res.status(500).send(error.message);

      if (user !== null) {
        return res.status(500).send('A user already exists with this email.');
      }

      const newUser = new User(req.body.user)
      newUser.save((error) => {
        if (error) res.status(500).send(error.message);
        return res.send('User created successfully.');
      });
    });
  });
};
