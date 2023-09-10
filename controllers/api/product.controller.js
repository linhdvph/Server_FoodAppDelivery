var model = require("../../models/model");
exports.getAll = async (req, res, next) => {
  try {
    var data = await model.ProductModel.find().sort({_id: -1}).populate("type_product");
    if (data.length > 0) {
      return res.status(200).json({
        msg: "Get list success",
        data_product: data
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

exports.getListHighestRating = async (req, res, next) => {
    try {
        var data = await model.ProductModel.find().limit(5).sort({rating: -1}).populate("type_product");
        if(data.length > 0){
            return res.status(200).json({
                msg: "Get new product success",
                data_product: data
            })
        }else{
            return res.status(400).json({
                msg: "Get new product failed"
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

exports.getListRating = async (req, res, next) => {
    try {
        var data = await model.ProductModel.find().sort({rating: -1}).populate("type_product");
        if(data.length > 0){
            return res.status(200).json({
                msg: "Get new product success",
                data_product: data
            })
        }else{
            return res.status(400).json({
                msg: "Get new product failed"
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

exports.getListByIdProductType = async (req, res, next) => {
    try {
        var id = req.params.id;
        var data = await model.ProductModel.find({type_product: id}).sort({rating: -1}).populate("type_product");
        if(data.length > 0){
            return res.status(200).json({
                msg: "Get product by type product success",
                data_product: data
            })
        }else{
            return res.status(400).json({
                msg: "Get product by type product failed"
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}


exports.add = async (req, res, next) => {
    try {
        var {name, type_product_id, price, descriptions, avatar, time, address, energy, rating} = req.body;
        var obj = new model.ProductModel({
            name: name,
            type_product: type_product_id,
            price: price,
            descriptions: descriptions,
            avatar: avatar,
            address: address,
            time: time,
            energy: energy,
            rating: rating,
        })

        var data = await obj.save();
        return res.status(201).json({
            msg: "Add product success",
            data_product: data
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
        var {name, type_product_id, price, descriptions, avatar, time, address, energy, rating} = req.body;
        var obj = new model.ProductModel({
            name: name,
            type_product: type_product_id,
            price: price,
            descriptions: descriptions,
            avatar: avatar,
            address: address,
            time: time,
            energy: energy,
            rating: rating,
            _id: id
        })
        await model.ProductModel.findByIdAndUpdate(id, obj);
        return res.status(200).json({
            msg: "Update product success"
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
        var data = await model.ProductModel.findByIdAndDelete(id);
        if(data != null){
            return res.status(200).json({
                msg: "Delete product success",
                data_product: data
            })
        }else{
            return res.status(400).json({
                msg: "Can't delete this product"
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
};
