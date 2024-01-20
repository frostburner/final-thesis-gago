module.exports = (sequelize, DataTypes) =>{
    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.INTEGER,
            allowNull: false
        },      
    },{
        timestamps: false // Disable automatic timestamps
    });
    
    Users.associate = (models) => {
        Users.belongsTo(models.Products, { foreignKey: 'id', as: 'user' });
        Users.belongsTo(models.Checkouts, { foreignKey: 'id', as: 'checkoutuser' });
        Users.belongsTo(models.Events, { foreignKey: 'id', as: 'eventuser' });
        Users.belongsTo(models.EventCheckouts, { foreignKey: 'id', as: 'eventcheckoutuser' });
        Users.belongsTo(models.Posts, { foreignKey: 'id', as: 'postuser' });
    };
    
    return Users
}