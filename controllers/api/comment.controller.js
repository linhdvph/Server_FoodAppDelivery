var model = require("../../models/model");
exports.getAll = async (req, res, next) => {
  try {
    var data = await model.CommentModel.find().populate([
      "id_user",
      "id_product",
    ]);
    if (data.length > 0) {
      return res.status(200).json({
        msg: "Get list success",
        data: data,
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
    var obj = new model.CommentModel({
      id_user: req.body.id_user,
      id_product: req.body.id_product,
      content: req.body.content,
      date: req.body.date,
    });

    var data = await obj.save();
    return res.status(201).json({
      msg: "Add order success",
      data_comment: data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.up = async (req, res, next) => {
  try {
    var id = req.params.id;
    var obj = new model.CommentModel({
      id_user: req.body.id_user,
      id_product: req.body.id_product,
      content: req.body.content,
      date: req.body.date,
      _id: id,
    });
    await model.CommentModel.findByIdAndUpdate(id, obj);
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
    var data = await model.CommentModel.findByIdAndDelete(id);
    if (data != null) {
      return res.status(200).json({
        msg: "Delete oder success",
        data_comment: data,
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

exports.findCommentWithIdUser = async (req, res, next) => {
  try {
    var id = req.params.id;
    var data = await model.CommentModel.find({ id_user: id }).populate([
        "id_user",
        "id_product",
      ]);
    if (data != null) {
      return res.status(200).json({
        msg: "Get comment success",
        data_comment: data,
      });
    } else {
      return res.status(400).json({
        msg: "Can't comment",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.findCommentWithIdProduct = async (req, res, next) => {
  try {
    var id = req.params.id;
    var data = await model.CommentModel.find({ id_product: id }).sort({_id: -1}).populate([
        "id_user",
        "id_product",
      ]).populate({
        path: 'id_product',
        populate: {path: 'type_product', model: "ProductTypeModel"}
      })
    if (data != null) {
      return res.status(200).json({
        msg: "Get comment success",
        data_comment: data,
      });
    } else {
      return res.status(400).json({
        msg: "Can't comment",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
