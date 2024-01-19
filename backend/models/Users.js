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
        Users.hasMany(models.Products, {foreignKey: "id"});
        Users.hasMany(models.Checkouts, {foreignKey: "id"});
    };
    return Users
}