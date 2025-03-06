"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
function getUsers(req, res) {
    res.send({ users: [] });
}
function getUserById(req, res) {
    res.send({ user: { id: req.params.id } });
}
function createUser(req, res) {
    // Request body should be validated prior to this (e.g. by using a middleware, etc)
    res.send({
        id: req.body.id,
        name: req.body.name,
    });
}
