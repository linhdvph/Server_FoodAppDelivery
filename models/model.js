var db = require("./db");

var UserSchema = new db.mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone_number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
      // required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    google: {
      type: String,
    },
    facebook: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    collection: "user",
  }
);

var ProductType = new db.mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    collection: "product_type",
  }
);

var Product = new db.mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type_product: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "ProductTypeModel",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    energy: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    quantity: Number
  },
  {
    collection: "product",
  }
);

var Cart = new db.mongoose.Schema(
  {
    id_user: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    id_product: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "ProductModel",
    },
    quantity_order: {
      type: Number,
    },
  },
  {
    collection: "cart",
  }
);

var Order = new db.mongoose.Schema(
  {
    id_user: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true
    },
    total_price: {
      type: Number,
      required: true,
    },
    date_canceled: {
      type: String
    },
    reason_canceled: {
      type: String
    },
    date: {
      type: String,
      required: true
    },
    list_product: {
      type: Array,
    },
    payment_method: {
      type: String,
      required: true
    },
    completion_time: {
      type: String
    },
    state: Number
  },
  {
    collection: "order",
  }
);

var Comment = new db.mongoose.Schema(
  {
    id_user: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    id_product: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: "ProductModel",
    },
    content: {
      type: String
    },
    date: {
      type: String
    }
  },
  {
    collection: "comment",
  }
);

var UrlImage = new db.mongoose.Schema(
  {
    url: String
  },
  {
    collection: "images",
  }
);



var UserModel = db.mongoose.model("UserModel", UserSchema);
var ProductTypeModel = db.mongoose.model("ProductTypeModel", ProductType);
var ProductModel = db.mongoose.model("ProductModel", Product);
var CartModel = db.mongoose.model("CartModel", Cart);
var OrderModel = db.mongoose.model("OrderModel", Order);
var CommentModel = db.mongoose.model("CommentModel", Comment);
var UrlImageModel = db.mongoose.model("UrlImageModel", UrlImage);

module.exports = {
  UserModel,
  ProductTypeModel,
  ProductModel,
  CartModel,
  OrderModel,
  CommentModel,
  UrlImageModel
};
