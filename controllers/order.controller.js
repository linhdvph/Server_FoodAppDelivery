var model = require("../models/model");
var multer = require("multer");
var fs = require("fs");

exports.getList = async (req, res, next) => {
  var list = await model.OrderModel.find()
    .populate("id_user")
    .populate({
      path: "list_product",
      populate: [
        { path: "id_user", model: "UserModel" },
        {
          path: "id_product",
          model: "ProductModel",
          populate: { path: "type_product", model: "ProductTypeModel" },
        },
      ],
    });

  console.log(list);
  res.render("order/list", { list: list });
};

exports.add = async (req, res, next) => {
  res.render("product/add");
};

exports.up = async (req, res, next) => {
  res.render("product/add");
};

exports.del = async (req, res, next) => {
  res.render("product/add");
};
