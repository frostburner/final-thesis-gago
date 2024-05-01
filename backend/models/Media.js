module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define("Media", {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Media;
};
