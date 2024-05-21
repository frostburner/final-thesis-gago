module.exports = (sequelize, DataTypes) =>{
    const Users = sequelize.define("Users", {
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },  
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        birthday:{
            type: DataTypes.DATE, // Assuming you only want the date
            allowNull: false
        },
        
        address:{
            type: DataTypes.STRING,
            allowNull: false
        },
      
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true, // Ensures email is unique
            // validate: {
            //     isEmail: true // Validates email format
            // }
        },
        image: {
            type: DataTypes.STRING,
            allowNull:true
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
    
    return Users;
};
