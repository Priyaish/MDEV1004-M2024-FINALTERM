import express from 'express';
import {
  DisplayBuildingList,
  DisplayBuildingById,
  AddBuilding,
  UpdateBuilding,
  DeleteBuilding
} from '../Controllers/building';

const router = express.Router();

// Route: GET /api/buildings
router.get('/building', DisplayBuildingList);

// Route: GET /api/buildings/:id
router.get('/building/:id', DisplayBuildingById);

// Route: POST /api/buildings
router.post('/building', AddBuilding);

// Route: PUT /api/buildings/:id
router.put('/building/:id', UpdateBuilding);

// Route: DELETE /api/buildings/:id
router.delete('/building/:id', DeleteBuilding);

export default router;