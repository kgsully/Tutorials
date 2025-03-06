"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_handlers_1 = require("../handlers/users.handlers");
const router = (0, express_1.Router)();
// GET /api/users
router.get('/', users_handlers_1.getUsers);
// GET /api/users/123
router.get('/:id', users_handlers_1.getUserById);
// POST /api/users
router.post('/', users_handlers_1.createUser);
exports.default = router;
