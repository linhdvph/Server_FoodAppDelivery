var express = require("express")
var router = express.Router();
var ProductCT = require("../../controllers/api/product.controller");

router.get("/", ProductCT.getAll);
router.post("/add", ProductCT.add);
router.post("/up/:id", ProductCT.up);
router.delete("/del/:id", ProductCT.del);

router.get("/new", ProductCT.getListHighestRating);
router.get("/list-rating", ProductCT.getListRating);
router.get("/list-by-product-type/:id", ProductCT.getListByIdProductType);

module.exports = router;