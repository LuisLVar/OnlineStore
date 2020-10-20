"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
const multer_1 = __importDefault(require("multer"));
var path = require('path');
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '/../../upload/images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer_1.default({ storage: storage });
class ImagenRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.post('/:id', imageController.index);
        this.router.get('/', imageController_1.imageController.getIndex);
        this.router.post('/:id', upload.array('file'), function (req, res, next) {
            res.send({
                text: "Recibido"
            });
        });
    }
}
const imagenRoutes = new ImagenRoutes();
exports.default = imagenRoutes.router;
