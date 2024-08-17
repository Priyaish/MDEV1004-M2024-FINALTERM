"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const building_1 = require("../Controllers/building");
const router = express_1.default.Router();
router.get('/buildings', building_1.DisplayBuildingList);
router.get('/buildings/:id', building_1.DisplayBuildingById);
router.post('/buildings', building_1.AddBuilding);
router.put('/buildings/:id', building_1.UpdateBuilding);
router.delete('/buildings/:id', building_1.DeleteBuilding);
exports.default = router;
//# sourceMappingURL=building.js.map