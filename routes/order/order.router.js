var express = require("express")
var router = express.Router()
var orderCT = require("../../controllers/order.controller")

router.get("/", orderCT.getList)

router.get("/add", orderCT.add)
router.post("/add", orderCT.add)

router.get("/up/:id", orderCT.up)
router.post("/up/:id", orderCT.up)

router.delete("/:id", orderCT.del)

module.exports = router