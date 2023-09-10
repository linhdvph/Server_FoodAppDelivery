var model = require("../../models/model");

exports.getAll = async (req, res, next) => {
    try {
        var data = await model.UrlImageModel.find();
        if(data.length > 0){
            return res.status(200).json({
                msg: "Get list url image success",
                data_url_image: data
            })
        }else{
            return res.status(400).json({
                msg: "Get list url image failed"
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
        var link = req.body.link;
        var obj = new model.UrlImageModel({
            url: link
        })
        let data = await obj.save();
        return res.status(201).json({
            msg: "Add url image success",
            data_url_image: data
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

exports.up = async (req, res, next) => {
    try {
        var id = req.params.id;
        var link = await req.body.link;
        var obj = new model.UrlImageModel({
            url: link,
            _id: id
        })
        await model.UrlImageModel.findByIdAndUpdate(id, obj);
        return res.status(201).json({
            msg: "Update url image success"
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

exports.del = async (req, res, next) => {
    try {
        var id = req.params.id;
        var data = await model.UrlImageModel.findByIdAndDelete(id);
        if(data != null){
            return res.status(200).json({
                msg: "Delete url image success",
                data_url_image: data
            })
        }else{
            return res.status(400).json({
                msg: "Can't delete this url image"
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}