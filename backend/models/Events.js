module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("Events", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Events.associate = (models) => {
    Events.belongsTo(models.Users, { foreignKey: "UserId", as: "eventuser" });
    Events.belongsTo(models.EventCheckouts, { foreignKey: "id", as: "event" });
  };

  return Events;
};
