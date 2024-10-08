"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const buildingSchema = new mongoose_1.Schema({
    id: { type: String },
    buildingID: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    dateBuilt: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    architects: { type: [String], required: true },
    cost: { type: Number, required: true },
    website: { type: String, required: true },
    imageURL: { type: String, required: true }
}, { timestamps: true });
const Building = (0, mongoose_1.model)('Building', buildingSchema);
exports.default = Building;
//# sourceMappingURL=building.js.map