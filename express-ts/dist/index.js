"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 5000;
const app = (0, express_1.default)();
app.get('/', (_req, res) => {
    res.send({ message: "Hello World! App is running" });
});
app.get('/hi', (_req, res) => {
    res.send("HI!");
});
app.listen(port, () => { console.log(`app is listening on port ${port}`); });
