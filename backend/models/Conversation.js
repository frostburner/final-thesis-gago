module.exports = (sequelize, DataTypes) =>{
    const Conversations = sequelize.define("Conversations", {
        groupname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Conversations.associate = (models) => {
        Conversations.hasMany(models.Messages, { foreignKey: 'ConversationId', as: 'messages' });
    };

    return Conversations;
}