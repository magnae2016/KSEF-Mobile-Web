var express = require('express');
var router = express.Router();

const { requireFindAccount } = require('../../controllers/accountsControllers');

router.post('/find_account', requireFindAccount);

module.exports = router;
