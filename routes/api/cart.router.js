var express = require("express")
var router = express.Router();
var CartCT = require("../../controllers/api/cart.controller");

router.get("/", CartCT.getAll);
router.post("/add", CartCT.add);
router.post("/up/:id", CartCT.up);
router.delete("/del/:id", CartCT.del);

router.get("/list-by-id-user/:id", CartCT.getListByIdUser)
router.post("/up-quantity-order/:id", CartCT.updateQuantityOrder);
router.delete("/del-cart-by-id-user/:id", CartCT.deleteByIdUser);

module.exports = router;