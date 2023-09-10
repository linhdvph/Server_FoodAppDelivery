var express = require("express")
var router = express.Router();
var ProductTypeCT = require("../../controllers/api/product_type.controller");

router.get("/", ProductTypeCT.getAll);
router.post("/add", ProductTypeCT.add);
router.post("/up/:id", ProductTypeCT.up);
router.delete("/del/:id", ProductTypeCT.del);

module.exports = router;