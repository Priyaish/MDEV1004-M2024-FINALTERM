import express from 'express';
const router = express.Router();
import passport from 'passport';
import {
  DisplayBuildingList,
  DisplayBuildingById,
  AddBuilding,
  UpdateBuilding,
  DeleteBuilding
} from '../Controllers/building';



/* List of building Routes (endpoints) */


router.get('/list', (req, res, next) => {  DisplayBuildingList(req, res, next); });

router.get('/find/:id', (req, res, next) => {  DisplayBuildingById(req, res, next); });

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => {  AddBuilding(req, res, next); });

router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {  UpdateBuilding(req, res, next); });

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {  DeleteBuilding(req, res, next); });

export default router;