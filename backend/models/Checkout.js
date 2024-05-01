module.exports = (sequelize, DataTypes) => {
  const Checkouts = sequelize.define("Checkouts", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Checkouts.associate = (models) => {
    Checkouts.belongsTo(models.Users, {
      foreignKey: "UserId",
      as: "checkoutuser",
    });
    Checkouts.belongsTo(models.Products, {
      foreignKey: "ProductId",
      as: "product",
    });
  };

  return Checkouts;
};
