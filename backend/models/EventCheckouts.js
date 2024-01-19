module.exports = (sequelize, DataTypes) =>{
    const EventCheckouts = sequelize.define("EventCheckouts", {
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        street:{
            type: DataTypes.STRING,
            allowNull: false
        },
        zipcode:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        refno:{
            type: DataTypes.STRING,
            allowNull: false
        },
        total:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    EventCheckouts.associate = (models) => {
        EventCheckouts.belongsTo(models.Users, { foreignKey: 'UserId', as: 'eventcheckoutuser' });
        EventCheckouts.belongsTo(models.Events, { foreignKey: 'EventId', as: 'event' });
    };
    
    return EventCheckouts
}