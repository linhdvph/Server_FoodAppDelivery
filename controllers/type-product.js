var model = require("../models/model")
var multer = require("multer")

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images")
    }
})