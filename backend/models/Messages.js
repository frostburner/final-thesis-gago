// models/Message.js
module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define("Messages", {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
  
    Messages.associate = (models) => {
        Messages.belongsTo(models.Conversations, { foreignKey: 'ConversationId', as: 'conversation' });
    };
  
    return Messages;
  };