var model = require("../../models/model");
exports.getAll = async (req, res, next) => {
  try {
    var data = await model.CartModel.find()
      .populate("id_user")
      .populate("id_product")
      .populate({
        path: "id_product",
        populate: {
          path: "type_product",
          model: "ProductTypeModel",
        },
      });
    if (data.length > 0) {
      return res.status(200).json({
        msg: "Get list success",
        data_cart: data,
      });
    } else {
      return res.status(400).json({
        msg: "List is empty",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.getListByIdUser = async (req, res, next) => {
  try {
    var id = req.params.id;
    var data = await model.CartModel.find({ id_user: id })
      .populate("id_user")
      .populate("id_product")
      .populate({
        path: "id_product",
        populate: {
          path: "type_product",
          model: "ProductTypeModel",
        },
      });
    if (data.length > 0) {
      return res.status(200).json({
        msg: "Get list cart by is user success.",
        data_cart: data,
      });
    } else {
      return res.status(400).json({
        msg: "List is empty.",
        data_cart: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.add = async (req, res, next) => {
  try {
    var { id_user, id_product, quantity_order } = req.body;

    // Tìm kiếm danh sách đối tượng Cart có cùng id_user
    var listAllCart = await model.CartModel.find({ id_user, id_product });

    if (listAllCart.length > 0) {
      // Cập nhật quantity_order của đối tượng đã có
      await model.CartModel.findOneAndUpdate(
        { id_user, id_product },
        { $inc: { quantity_order } },
        { upsert: true }
      );

      return res.status(200).json({
        msg: "Cart already exists. Quantity updated",
      });
    } else {
      // Thêm mới đối tượng Cart
      var obj = new model.CartModel({
        id_user,
        id_product,
        quantity_order,
      });

      var data = await obj.save();

      return res.status(201).json({
        msg: "Add cart success",
        data_cart: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.up = async (req, res, next) => {
  try {
    var id = req.params.id;
    var obj = new model.CartModel({
      id_user: req.body.id_user,
      id_product: req.body.id_product,
      quantity_order: req.body.quantity_order,
      _id: id,
    });
    await model.CartModel.findByIdAndUpdate(id, obj);
    return res.status(200).json({
      msg: "Update cart success",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updateQuantityOrder = async (req, res) => {
  try {
    var id = req.params.id;
    var quantity = req.body.quantity_order;
    await model.CartModel.findByIdAndUpdate(id, { quantity_order: quantity });
    return res.status(200).json({
      msg: "Update product in cart success",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.del = async (req, res, next) => {
  try {
    var id = req.params.id;
    var data = await model.CartModel.findByIdAndDelete(id);
    if (data != null) {
      return res.status(200).json({
        msg: "Delete cart success",
        data_cart: data,
      });
    } else {
      return res.status(400).json({
        msg: "Can't delete this cart",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.deleteByIdUser = async (req, res, next) => {
  try {
    var id_user = req.params.id;
    var data = await model.CartModel.deleteMany({ id_user: id_user });
    if (data != null) {
      return res.status(200).json({
        msg: "Delete cart by id user success",
        data_cart: data,
      });
    } else {
      return res.status(400).json({
        msg: "Delete cart by id user failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
