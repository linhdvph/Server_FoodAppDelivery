var express = require("express")
var router = express.Router();
var UserCT = require("../../controllers/api/user.controller");

router.get("/", UserCT.getAll);
router.post("/phone_number", UserCT.getUserByPhoneNumber);
router.post("/add", UserCT.add);
router.post("/sign_in", UserCT.signIn);
router.post("/up/:id", UserCT.up);
router.post("/up_passwd/:id", UserCT.updatePasswd);
router.post("/up_name/:id", UserCT.updateName);
router.post("/up_address/:id", UserCT.updateAddress);
router.post("/up_phone_number/:id", UserCT.updatePhoneNumber);
router.delete("/del/:id", UserCT.del);

module.exports = router;