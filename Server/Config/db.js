"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const remoteURI = process.env.MONGO_URI;
if (!remoteURI) {
    throw new Error('MONGO_URI is not defined in environment variables');
}
exports.default = {
    remoteURI: remoteURI,
};
//# sourceMappingURL=db.js.map