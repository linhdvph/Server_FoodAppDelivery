var express = require("express")
var router = express.Router()
var productCT = require("../../controllers/product.controller")

router.get("/", productCT.getList)
router.get("/add", productCT.add)
router.post("/add", productCT.upload, productCT.add)
router.get("/up/:id", productCT.up)
router.post("/up/:id", productCT.up)
router.delete("/:id", productCT.del)

module.exports = router