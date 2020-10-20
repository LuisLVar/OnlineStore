"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PortadaController {
    getPortada(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "SELECT * FROM PORTADA";
            yield connect.exec(query, [], function (result) {
                res.send(result);
            });
        });
    }
    updatePortada(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `update portada set 
        nombre = :nombre,
        slogan = :slogan,
        imagen = :imagen,
        mision = :mision,
        vision = :vision,
        about = :about,
        video = :video  where rownum = 1`;
            yield connect.exec(query, [req.body.nombre, req.body.slogan, req.body.imagen, req.body.mision, req.body.vision, req.body.about, req.body.video], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json(result);
            });
        });
    }
}
exports.portadaController = new PortadaController();
