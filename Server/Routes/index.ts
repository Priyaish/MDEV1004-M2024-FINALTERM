/**
 * File: indexRoutes.ts
 * Author: Priyanka Saxena
 * StudentID: 200583643
 * Date: 2024-08-17
 */

import express from 'express';
import {
  DisplayBuildingList,
  DisplayBuildingById,
  AddBuilding,
  UpdateBuilding,
  DeleteBuilding
} from '../Controllers/buildings';

const router = express.Router();

// Route: GET /api/buildings
router.get('/buildings', DisplayBuildingList);

// Route: GET /api/buildings/:id
router.get('/buildings/:id', DisplayBuildingById);

// Route: POST /api/buildings
router.post('/buildings', AddBuilding);

// Route: PUT /api/buildings/:id
router.put('/buildings/:id', UpdateBuilding);

// Route: DELETE /api/buildings/:id
router.delete('/buildings/:id', DeleteBuilding);

export default router;

