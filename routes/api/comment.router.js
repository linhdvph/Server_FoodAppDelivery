var express = require("express")
var router = express.Router();
var CommentCT = require("../../controllers/api/comment.controller");

router.get("/", CommentCT.getAll);
router.get("/user/:id", CommentCT.findCommentWithIdUser);
router.get("/product/:id", CommentCT.findCommentWithIdProduct);
router.post("/add", CommentCT.add);
router.post("/up/:id", CommentCT.up);
router.delete("/del/:id", CommentCT.del);

module.exports = router;