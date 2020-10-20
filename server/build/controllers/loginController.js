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
class LoginController {
    getLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "SELECT * FROM USUARIO WHERE email = :email and clave = :clave";
            ;
            yield connect.exec(query, [req.body.email, req.body.clave], function (result) {
                res.send(result);
            });
        });
    }
    getLoginEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "SELECT * FROM USUARIO WHERE email = :email";
            ;
            yield connect.exec(query, [req.body.email], function (result) {
                res.send(result);
            });
        });
    }
}
exports.loginController = new LoginController();
