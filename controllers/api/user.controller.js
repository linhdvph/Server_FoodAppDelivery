var model = require("../../models/model");
var validate = require("../../validation/validate");
exports.getAll = async (req, res, next) => {
  try {
    var data = await model.UserModel.find();
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

exports.getUserByPhoneNumber = async (req, res, next) => {
  try {
    var phoneNumber = req.body.phone_number;
    var data = await model.UserModel.findOne({ phone_number: phoneNumber });
    if (data != null) {
      return res.status(200).json({
        msg: "Find user by phone number success",
        data: data,
      });
    } else {
      return res.status(400).json({
        msg: "Can't find user by this phone number",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    var { phone_number, passwd } = req.body;
    if (!phone_number.match(validate.REGEX_PHONE_NUMBER)) {
      return res.status(400).json({
        msg: "Phone number is invalid",
      });
    }
    var data = null;
    if (passwd == null || passwd == "") {
      data = await model.UserModel.findOne({ phone_number: phone_number });
    } else {
      data = await model.UserModel.findOne({
        phone_number: phone_number,
        password: passwd,
      });
    }

    if (data != null) {
      return res.status(200).json({
        msg: "SignIn success",
        data: data,
      });
    } else {
      return res.status(400).json({
        msg: "SignIn failed (maybe the phone number is not register or password incorrect)",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

//Same SignUp
exports.add = async (req, res, next) => {
  try {
    var {
      name,
      email,
      phone_number,
      passwd,
      address,
      role,
      avatar,
      google,
      facebook,
      date,
    } = req.body;
    var list = await model.UserModel.findOne({ phone_number: phone_number });
    if (list != null) {
      return res.status(400).json({
        msg: "Phone number already exists, please choose another phone number!",
      });
    }
    var obj = new model.UserModel({
      name: name,
      email: email,
      phone_number: phone_number,
      password: passwd,
      address: address,
      role: role,
      avatar: avatar,
      google: google,
      facebook: facebook,
      date: date,
    });
    if (email != "") {
      if (!email.match(validate.REGEX_EMAIL)) {
        return res.status(400).json({
          msg: "Email invalidate",
        });
      }
    }

    if (!phone_number.match(validate.REGEX_PHONE_NUMBER)) {
      return res.status(400).json({
        msg: "Phone number invalidate",
      });
    }

    if (passwd != "") {
      if (!passwd.match(validate.REGEX_PASSWD)) {
        return res.status(400).json({
          msg: "Passwords must be between 6 and 20 in length and have both letters and numbers!",
        });
      }
    }

    var data = await obj.save();
    return res.status(201).json({
      msg: "Add user success",
      data: data,
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
    var {
      name,
      email,
      phone_number,
      passwd,
      address,
      role,
      avatar,
      google,
      facebook,
      date,
    } = req.body;
    var obj = new model.UserModel({
      name: name,
      email: email,
      phone_number: phone_number,
      password: passwd,
      address: address,
      role: role,
      avatar: avatar,
      google: google,
      facebook: facebook,
      date: date,
      _id: id,
    });
    if (email != "") {
      if (!email.match(validate.REGEX_EMAIL)) {
        return res.status(400).json({
          msg: "Email invalidate",
        });
      }
    }
    if (!phone_number.match(validate.REGEX_PHONE_NUMBER)) {
      return res.status(400).json({
        msg: "Phone number invalidate",
      });
    }
    if (passwd != "") {
      if (!passwd.match(validate.REGEX_PASSWD)) {
        return res.status(400).json({
          msg: "Passwords must be between 6 and 20 in length and have both letters and numbers!",
        });
      }
    }

    await model.UserModel.findByIdAndUpdate(id, obj);
    return res.status(200).json({
      msg: "Update user success",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updatePasswd = async (req, res, next) => {
  try {
    var id = req.params.id;
    var passwd = req.body.passwd;
    var data = await model.UserModel.findByIdAndUpdate(id, {
      password: passwd,
    });
    if (passwd === "") {
      return res.status(400).json({
        msg: "Please complete full information",
      });
    }
    if (!passwd.match(validate.REGEX_PASSWD)) {
      return res.status(400).json({
        msg: "Passwords must be between 6 and 20 in length and have both letters and numbers!",
      });
    }
    if (data != null) {
      return res.status(200).json({
        msg: "Update password user success",
      });
    } else {
      return res.status(400).json({
        msg: "Can't update password user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updateName = async (req, res, next) => {
  try {
    var id = req.params.id;
    var name = req.body.name;
    var data = await model.UserModel.findByIdAndUpdate(id, { name: name });
    if (name === "") {
      return res.status(400).json({
        msg: "Please complete full information",
      });
    }
    if (!name.match(validate.REGEX_NAME)) {
      return res.status(400).json({
        msg: "Name must be between 6 and 20 in length",
      });
    }
    if (data != null) {
      return res.status(200).json({
        msg: "Update name user success",
      });
    } else {
      return res.status(400).json({
        msg: "Can't update name user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    var id = req.params.id;
    var address = req.body.address;
    var data = await model.UserModel.findByIdAndUpdate(id, {
      address: address,
    });
    if (address === "") {
      return res.status(400).json({
        msg: "Please complete full information",
      });
    }
    if (data != null) {
      return res.status(200).json({
        msg: "Update address user success",
      });
    } else {
      return res.status(400).json({
        msg: "Can't update address user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updatePhoneNumber = async (req, res, next) => {
  try {
    var id = req.params.id;
    var phone_number = req.body.phone_number;
    var data = await model.UserModel.findByIdAndUpdate(id, {
      phone_number: phone_number,
    });
    if (phone_number === "") {
      return res.status(400).json({
        msg: "Please complete full information",
      });
    }
    if (!phone_number.match(validate.REGEX_PHONE_NUMBER)) {
      return res.status(400).json({
        msg: "Phone number is invalid",
      });
    }
    if (data != null) {
      return res.status(200).json({
        msg: "Update phone number user success",
      });
    } else {
      return res.status(400).json({
        msg: "Can't update phone number user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updateGoogleAccount = async (req, res, next) => {
  try {
    
    if (data != null) {
      return res.status(200).json({
        msg: "Delete user success",
        data: data,
      });
    } else {
      return res.status(400).json({
        msg: "Can't delete this user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.del = async (req, res, next) => {
  try {
    var id = req.params.id;
    var data = await model.UserModel.findByIdAndDelete(id);
    if (data != null) {
      return res.status(200).json({
        msg: "Delete user success",
        data: data,
      });
    } else {
      return res.status(400).json({
        msg: "Can't delete this user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
