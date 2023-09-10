var model = require("../../models/model");
exports.getAll = async (req, res, next) => {
  try {
    var data = await model.OrderModel.find().sort({_id: -1})
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
    if (data.length > 0) {
      return res.status(200).json({
        msg: "Get list success",
        data_order: data,
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

exports.getOrderByIdUser = async (req, res, next) => {
    try {
        var id = req.params.id;
      var data = await model.OrderModel.find({id_user: id}).sort({_id: -1})
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
      if (data.length > 0) {
        return res.status(200).json({
          msg: "Get list success",
          data_order: data,
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

exports.add = async (req, res, next) => {
  try {
    var id_user = req.body.id_user_add;
    var list = await model.CartModel.find({ id_user: id_user });
    var obj = new model.OrderModel({
      id_user: id_user,
      total_price: req.body.total_price,
      date: req.body.date,
      date_canceled: req.body.date_canceled,
      reason_canceled: req.body.reason_canceled,
      list_product: list,
      state: req.body.state,
      payment_method: req.body.payment_method,
      completion_time: req.body.completion_time
    });

    var data = await obj.save();
    return res.status(201).json({
      msg: "Add order success",
      data_order: data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.up = async (req, res, next) => {
  try {
    var id_user = req.body.id_user_add;
    var list = await model.CartModel.find({ id_user: id_user });
    var id = req.params.id;
    var obj = new model.OrderModel({
      id_user: req.body.id_user,
      total_price: req.body.total_price,
      date: req.body.date,
      date_canceled: req.body.date_canceled,
      reason_canceled: req.body.reason_canceled,
      list_product: list,
      state: req.body.state,
      payment_method: req.body.payment_method,
      completion_time: req.body.completion_time,
      _id: id,
    });
    await model.OrderModel.findByIdAndUpdate(id, obj);
    return res.status(200).json({
      msg: "Update order success",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.upState = async (req, res, next) => {
  try {
    var id_user = req.body.id_user_add;
    var list = await model.CartModel.find({ id_user: id_user });
    var id = req.params.id;
    var {state, completion_time} = req.body;
    await model.OrderModel.findByIdAndUpdate(id, {state: state, completion_time: completion_time, list: list});
    return res.status(200).json({
      msg: "Update order success",
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
    var data = await model.OrderModel.findByIdAndDelete(id);
    if (data != null) {
      return res.status(200).json({
        msg: "Delete oder success",
        data_order: data,
      });
    } else {
      return res.status(400).json({
        msg: "Can't delete this order",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.delAllByIdUser = async (req, res, next) => {
  try {
    var id = req.params.id;
    var data = await model.OrderModel.deleteMany({id_user: id});
    if (data != null) {
      return res.status(200).json({
        msg: "Delete all oder success",
        data_order: data,
      });
    } else {
      return res.status(400).json({
        msg: "Can't delete this order",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
