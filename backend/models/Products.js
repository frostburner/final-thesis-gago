module.exports = (sequelize, DataTypes) =>{
    const Products = sequelize.define("Products", {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },      
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },      
        image:{
            type: DataTypes.STRING,
            allowNull: false
        },      
    });

    Products.associate = (models) => {
        Products.belongsTo(models.Users, { foreignKey: 'UserId', as: 'user' });
        Products.hasOne(models.Checkouts, { foreignKey: 'ProductId'});
    };

    return Products
}