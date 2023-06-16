const express = require('express')
const router = express.Router();

const user = require("../controller/user");

router.post("/createuser", user.createUser);

router.post("/findcreate", user.findAndCreate);

module.exports = router;