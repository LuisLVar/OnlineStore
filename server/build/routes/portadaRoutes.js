"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portadaController_1 = require("../controllers/portadaController");
class PortadaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', portadaController_1.portadaController.getPortada);
        this.router.put('/', portadaController_1.portadaController.updatePortada);
    }
}
const portadaRoutes = new PortadaRoutes();
exports.default = portadaRoutes.router;
