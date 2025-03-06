"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.getUserById = getUserById;
function getUsers(req, res) {
    res.json({ users: [] });
}
function getUserById(req, res) {
    res.json({ user: { id: req.params.id } });
}
