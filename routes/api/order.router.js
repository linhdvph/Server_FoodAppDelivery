var express = require("express")
var router = express.Router();
var OrderCT = require("../../controllers/api/order.controller");

router.get("/", OrderCT.getAll);
router.get("/:id", OrderCT.getOrderByIdUser);
router.post("/add", OrderCT.add);
router.post("/up/:id", OrderCT.up);
router.delete("/del/:id", OrderCT.del);
router.delete("/del-all-by-id-user/:id", OrderCT.delAllByIdUser);

router.post("/up-state/:id", OrderCT.upState);

module.exports = router;