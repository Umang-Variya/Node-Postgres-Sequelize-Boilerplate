const db = require("../models"); // models path depend on your structure
const tutorialController = require('./tutorial')
const {
    QueryTypes
} = require('sequelize');

const User = db.user;
const Tutorial = db.tutorials;

const {
    Op
} = require("sequelize");
const {
    getPagination,
    getPagingData
} = require('../utils/pagination')

// exports.createUser = (req, res, tutorialId) => {
//     return User.create({
//             username: req.body.username,
//             tutorialId: tutorialId,
//         })
//         .then((data) => {
//             console.log(">> Created comment: " + JSON.stringify(data, null, 4));
//             return data;
//         })
//         .catch((err) => {
//             console.log(">> Error", err);
//         });
// };

exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.tutorialId) {
        res.status(400).send({
            msg: "Content can not be empty!"
        });
        return;
    }
    // Create a Tutorial
    const user = {
        username: req.body.username,
        tutorialId: req.body.tutorialId
    };
    console.log(user);
    // Save Tutorial in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: err.msg || "Some error occurred"
            });
        });
};


exports.findUserById = (userId) => {
    // console.log(userId);
    return User.findByPk(userId)
        .then((tutorial) => {
            return tutorial;
        })
        .catch((err) => {
            console.log(">> Error " + err);
        });
};


exports.findAllUser = (userId) => {
    return User.findByPk(userId, {

        })
        .then((tutorial) => {
            return tutorial;
        })
        .catch((err) => {
            console.log(">> Error ", err);
        });
};

exports.findAll = () => {

    return Tutorial.findAll({

        include: ["users"],

    }).then((tutorials) => {
        return tutorials;
    });
};

exports.findAndCreate = async (req, res) => {

    const [user, created] = await User.findOrCreate({
        where: {
            username: req.body.username,
            tutorialId: req.body.tutorialId
        }
    }).then((user) => {
        console.log(user, 'user');
        return user;
    });
    console.log(user.username);
    console.log(user.tutorialId);
    console.log(created);







    // const user = {
    //     username: req.body.username,
    //     tutorialId: req.body.tutorialId
    // };
    // console.log(user);
    // const selector = {
    //     where: {
    //         username: user.username
    //     }
    // }
    // console.log(selector);
    // await User.findOrCreate(selector, user).then((user) => {
    //     console.log(user, 'user');
    //     return user;
    // });
};