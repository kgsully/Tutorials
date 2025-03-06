"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const PORT = 5000;
const app = (0, express_1.default)();
app.use('/api/users', users_routes_1.default);
app.get('/', (_req, res) => {
    res.send({ message: "Success!!" });
});
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
