const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    // logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);

db.tutorials.hasMany(db.user, {
    as: "users"
});
db.user.belongsTo(db.tutorials, {
    foreignKey: "tutorialId",
    as: "tutorial",
});

module.exports = db;