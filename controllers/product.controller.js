var model = require("../models/model")
var multer = require("multer")
var fs = require("fs")

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

exports.upload = multer({storage: storage}).single("avatar")

exports.getList = async (req, res, next) => {
    var list = await model.ProductModel.find().populate("type_product")
    var listTL = await model.ProductTypeModel.find()
    res.render("product/list", {list: list, listTL: listTL})
}

exports.add = async (req, res, next) => {
    var listTL = await model.ProductTypeModel.find()
    if(req.method == "POST"){
        var {type_product, name, price, address, time, energy, rating, descriptions} = req.body
        var avatar = req.protocol + '://'+req.get('host')+'/'+req.file.filename
        console.log(req.file);
        var obj = new model.ProductModel({
            type_product: type_product,
            name: name,
            address: address,
            price: price,
            time: time,
            energy: energy,
            rating: rating,
            descriptions: descriptions,
            avatar: avatar
        })
        console.log(req.body);
        try {
            await obj.save()
            res.redirect("/product")
        } catch (error) {
            console.log(error);
        }
    }
    res.render("product/add", {listTL: listTL})
}

exports.up = async (req, res, next) => {
    res.render("product/add")
}

exports.del = async (req, res, next) => {
    res.render("product/add")
}