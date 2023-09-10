var express = require("express")
var router = express.Router();
var ImageCT = require("../../controllers/api/image.controller");

router.get("/", ImageCT.getAll);
router.post("/add", ImageCT.add);
router.post("/up/:id", ImageCT.up);
router.delete("/del/:id", ImageCT.del);

module.exports = router;