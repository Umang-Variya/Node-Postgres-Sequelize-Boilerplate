const db = require("../models"); // models path depend on your structure
const userController = require('./user')
const {
    QueryTypes
} = require('sequelize');

const User = db.user;
const Tutorial = db.tutorials;

const user = require("../controller/user");

const {
    Op
} = require("sequelize");
const {
    getPagination,
    getPagingData
} = require('../utils/pagination');
const tutorial = require("../models/tutorial");

exports.createTutorial = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            msg: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    // Save Tutorial in the database
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: err.msg || "Some error occurred"
            });
        });
};



exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;
    Tutorial.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: err.msg || "Some error occurred."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: "Error retrieving Tutorial with id=" + id
            });
        });
};

exports.pagination = (req, res) => {
    const {
        page,
        size,
        title
    } = req.query;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;
    const {
        limit,
        offset
    } = getPagination(page, size);
    Tutorial.findAndCountAll({
            where: condition,
            limit,
            offset
        })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.test = async (req, res) => {

    // const tut1 = await userController.findAllUser(1);

    // const xyz = tut1.dataValues.id

    // const tut1Data = await userController.findUserById(2);

    // console.log(
    //     ">> Tutorial id=" + xyz,
    //     JSON.stringify(tut1Data, null, 2)
    // );

    const all = await userController.findAll()

    res.send(all)

    // console.log(">> All tutorials", JSON.stringify(all, null, 2));
    // console.log(all,"all")
    // const id = req.params.id;

    // User.findAll()
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             msg: "Error retrieving Tutorial with id"
    //         });
    //     });


    // let cars = await db.sequelize.query('SELECT b.id,a.t_name , b.title,b.description,b.published,b.createdAt,b.updatedAt FROM tutorials as b JOIN user as a on a.t_id = b.id', {
    //     type: db.sequelize.QueryTypes.SELECT
    // });

    // res.send(cars)
}

exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    msg: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    msg: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: "Error updating Tutorial with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    msg: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    msg: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: "Could not delete Tutorial with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                msg: `${nums} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                msg: err.msg || "Some error occurred while removing all tutorials."
            });
        });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({
            where: {
                published: true
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                msg: err.msg || "Some error occurred while retrieving tutorials."
            });
        });
};