// relationships.js
const Business = require("../businesses/models/businessesModel");
const User = require("../auth/models/usersModel");
const Product = require("../products/models/productsModel");
const PurchaseOrder = require("../purchase-orders/models/purchaseOrdersModel");
const OrderProducts = require("../purchase-orders/models/orderProductsModel");

const setupRelationships = () => {
  // Relación Business -> User (1:1)
  Business.belongsTo(User, {
    foreignKey: "user_id",
    as: "owner",
    onDelete: "CASCADE",
  });

  User.hasOne(Business, {
    foreignKey: {
      name: "user_id",
      allowNull: false, // <-- Obligatorio
    },
    as: "business",
  });

  // Relación Product -> Business (M:1)
  Product.belongsTo(Business, {
    foreignKey: "business_id",
    as: "business",
    onDelete: "CASCADE",
  });

  Business.hasMany(Product, {
    foreignKey: "business_id",
    as: "products",
  });

  // Relación PurchaseOrder -> Business (M:1)
  PurchaseOrder.belongsTo(Business, {
    foreignKey: "business_id",
    as: "business",
    onDelete: "CASCADE",
  });

  Business.hasMany(PurchaseOrder, {
    foreignKey: "business_id",
    as: "orders",
  });

  // Relación PurchaseOrder -> User (M:1)
  PurchaseOrder.belongsTo(User, {
    foreignKey: "user_id",
    as: "customer",
    onDelete: "SET NULL",
  });

  User.hasMany(PurchaseOrder, {
    foreignKey: "user_id",
    as: "orders",
  });

  // Relación PurchaseOrder <-> Product (M:M)
  PurchaseOrder.belongsToMany(Product, {
    through: OrderProducts,
    foreignKey: "purchase_order_id",
    as: "products",
    onDelete: "CASCADE",
  });

  Product.belongsToMany(PurchaseOrder, {
    through: OrderProducts,
    foreignKey: "product_id",
    as: "orders",
    onDelete: "RESTRICT", // Evita borrar productos con órdenes asociadas
  });

  // Relación directa con la tabla intermedia
  OrderProducts.belongsTo(PurchaseOrder, {
    foreignKey: "purchase_order_id",
  });

  OrderProducts.belongsTo(Product, {
    foreignKey: "product_id",
  });
};

module.exports = setupRelationships;
