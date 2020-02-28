const User = require('../models/user');
const UserSession = require('../models/session')
const bcrypt = require('bcryptjs');


module.exports = () => {

  /**
   * POST method
   * Used for user creation (registration)
   */
  app.post('/api/users', (req, res) => {
    User.findOne({ email: req.body.user.email }, (error, user) => {
      // Handle database connection errors
      if (error) return res.status(500).end(error.message);

      // Check if email already exists in the database
      if (user !== null) {
        return res.status(500).end('A user already exists with this email.');
      }

      // Create new user and save to the database
      const newUser = new User(req.body.user);
      newUser.save((error) => {
        if (error) res.status(500).end(error.message);
        return res.status(200).end('User created successfully.');
      });
    });
  });


  /*
   * POST method
   * Used for user login  
  */

  app.post('/api/login', (req, res) => {
    const { body } = req;
    const { password } = body;

    let { email } = body;    
    
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }  
    
    User.find({ email: email }, (err, users) => {

      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: Email does not exist!'
        });
      }

      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }      

      const user = users[0];

      let comparison = user.comparePassword(password);
      if (!comparison) {
        return res.send({
          success: false,
          message: 'Error: Password is not correct!'
        });
      }      
      
      // Otherwise correct user
     
      const userSession = new UserSession();
      userSession.userId = user._id;
     
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }        

        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    });
  });

  /*
   * GET method
   * Used for user logout  
  */


  app.get('/api/logout', (req, res) => {
    
    // Get the token
    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind and it's not deleted.    
    UserSession.findOneAndUpdate({ _id: token, isDeleted: false}, { 
        $set: {
          isDeleted:true
        }
      }, null, (err) => {
            if (err) {
              console.log(err);
              return res.send({
                success: false,
                message: 'Error: Server error'
              });
            }   

              return res.send({
                success: true,
                message: 'Good'
              });
            });
  });

  /*
   * GET method
   * Used to verify user's token 
  */

  app.get('/api/verify', (req, res) => {

    //Get the token
    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind and it's not deleted.   

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: User Not Found!'
        });
      }      
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'User Found!'
        });
      }
    });
  });
  
};