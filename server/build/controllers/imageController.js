"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageController {
    index(req, res) {
        res.json(req.body);
    }
    getIndex(req, res) {
        res.json({
            text: 'Listo para recibir bro'
        });
    }
}
exports.imageController = new ImageController();
