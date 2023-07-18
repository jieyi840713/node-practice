"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 3000;
app.get("/", function (req, res) {
    res.send("the server is working");
});
app.listen(port, function () {
    if (port === 3000) {
        console.log("true");
    }
    console.log("server is listening on ".concat(port, "!!!"));
});
