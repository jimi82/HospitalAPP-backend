// Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mdAuth = require('../middleware/authentication');
// var SEED = require('../config/config').SEED;

// Init variables
var app = express();

var User = require('../models/user');

// ================================
// Getting list of users
// ================================
app.get('/', (req, res, next) => {

    User.find({}, "name email role img")
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error loading user',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    users: users
                });
            });
});

// ==========================================
// Actualizar usuario
// ==========================================
app.put('/:id', mdAuth.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    User.findById(id, (err, user) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error findind user',
                errors: err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                menssage: 'The user id ' + id + ' doesn`t exist',
                errors: { message: 'Not exist an user with that ID' }
            });
        }


        user.name = body.name;
        user.email = body.email;
        user.role = body.role;

        user.save((err, savedUser) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    menssage: 'Error updating the user',
                    errors: err
                });
            }

            savedUser.password = ':)';

            res.status(200).json({
                ok: true,
                user: savedUser
            });

        });

    });

});


// ================================
// Creating an user
// ================================

app.post('/', mdAuth.verifyToken, (req, res, next) => {
    var body = req.body;

    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    })

    user.save((err, storedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error creating an user',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            user: storedUser,
            usertoken: req.user
        });
    });

});


// ============================================
//   Deleting an user by ID
// ============================================
app.delete('/:id', mdAuth.verifyToken, (req, res) => {

    var id = req.params.id;

    User.findByIdAndRemove(id, (err, erasedUser) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                menssage: 'Error deleting an user',
                errors: err
            });
        }

        if (!erasedUser) {
            return res.status(400).json({
                ok: false,
                mensaje: 'That user doesn`t exist',
                errors: { message: 'Not exist an user with that ID' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: erasedUser
        });

    });

});


module.exports = app;