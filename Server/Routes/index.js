"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const buildings_1 = require("../Controllers/buildings");
const router = express_1.default.Router();
router.get('/buildings', buildings_1.DisplayBuildingList);
router.get('/buildings/:id', buildings_1.DisplayBuildingById);
router.post('/buildings', buildings_1.AddBuilding);
router.put('/buildings/:id', buildings_1.UpdateBuilding);
router.delete('/buildings/:id', buildings_1.DeleteBuilding);
exports.default = router;
//# sourceMappingURL=index.js.map