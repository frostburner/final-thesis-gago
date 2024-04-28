module.exports = (sequelize, DataTypes) =>{
    const Posts = sequelize.define("Posts", {
        message:{
            type: DataTypes.STRING,
            allowNull: false
        },
        media: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    Posts.associate = (models) => {
        Posts.belongsTo(models.Users, { foreignKey: 'UserId', as: 'postuser' });
        Posts.hasMany(models.Comments, { onDelete: "cascade" });

    };
    
    return Posts
}