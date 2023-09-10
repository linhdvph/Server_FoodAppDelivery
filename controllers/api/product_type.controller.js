var model = require("../../models/model");
exports.getAll = async (req, res, next) => {
  try {
    var data = await model.ProductTypeModel.find();
    if (data.length > 0) {
      return res.status(200).json({
        msg: "Get list success",
        data_product_type: data
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
        var obj = new model.ProductTypeModel({
           name: req.body.name,
           avatar: req.body.avatar
        })

        var data = await obj.save();
        return res.status(201).json({
            msg: "Add product type success",
            data_product_type: data
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
};

exports.up = async (req, res, next) => {
    try {
        var id = req.params.id;
        var obj = new model.ProductTypeModel({
            name: req.body.name,
            avatar: req.body.avatar,
            _id: id
        })
        await model.ProductTypeModel.findByIdAndUpdate(id, obj);
        return res.status(200).json({
            msg: "Update product type success"
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
};

exports.del = async (req, res, next) => {
    try {
        var id = req.params.id;
        var data = await model.ProductTypeModel.findByIdAndDelete(id);
        if(data != null){
            return res.status(200).json({
                msg: "Delete product type success",
                data_product_type: data
            })
        }else{
            return res.status(400).json({
                msg: "Can't delete this product type"
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
};
