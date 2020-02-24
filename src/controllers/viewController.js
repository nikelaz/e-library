const path = require('path');

/**
 * viewController
 * Catches all routes and sends the index.html file which is the React SPA view
 * /api routes are overriden by the other controllers
 */
module.exports = () => {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../dist/index.html'));
  });
};
