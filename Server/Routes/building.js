"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const building_1 = require("../Controllers/building");
router.get('/list', (req, res, next) => { (0, building_1.DisplayBuildingList)(req, res, next); });
router.get('/find/:id', (req, res, next) => { (0, building_1.DisplayBuildingById)(req, res, next); });
router.post('/add', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, building_1.AddBuilding)(req, res, next); });
router.put('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, building_1.UpdateBuilding)(req, res, next); });
router.delete('/delete/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, building_1.DeleteBuilding)(req, res, next); });
exports.default = router;
//# sourceMappingURL=building.js.map