module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            email: {
                type: DataTypes.STRING(30),
                allowNull: false, //필수
                unique: true
            },
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false,

            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            }
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });

    User.associate = (db) => {

    };
    return User;
};