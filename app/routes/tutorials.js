const express = require('express')
const router = express.Router();

const tutorials = require("../controller/tutorial");

router.post("/", tutorials.createTutorial);
router.get("/all", tutorials.findAll);
router.get("/test", tutorials.test);
router.get("/pagination", tutorials.pagination);
router.get("/published", tutorials.findAllPublished);
router.get("/:id", tutorials.findOne);
router.put("/:id", tutorials.update);
router.delete("/:id", tutorials.delete);
router.delete("/", tutorials.deleteAll);

module.exports = router;