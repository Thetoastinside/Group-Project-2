const router = require('express').Router();

const apiRoutes = require('./api');  // imports the index.js from the api folder
const homeRoutes = require('./homeRoutes.js');

router.use('/api', apiRoutes); // all routes defined in apiRoutes will be prefixed with /api
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;
