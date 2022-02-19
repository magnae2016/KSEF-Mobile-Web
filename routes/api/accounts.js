var express = require('express');
var router = express.Router();

const { requireFindAccount, requireFindPassword } = require('../../controllers/accountsControllers');

router.post('/find_account', requireFindAccount);

router.post('/find_password', requireFindPassword);

module.exports = router;
