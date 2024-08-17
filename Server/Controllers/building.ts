/**
 * File: buildingControllers.ts
 * Author: Priyanka Saxena
 * StudentID: 200583643
 * Date: 2024-08-17
 */

import { Request, Response, NextFunction } from 'express';
import Building from '../Models/building'; 
import { SanitizeArray } from '../Util';

/**
 * This function displays the building list in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayBuildingList(req: Request, res: Response, next: NextFunction): void {
    Building.find({})
        .then((data) => {
            res.status(200).json({ success: true, msg: "Building List Retrieved and Displayed", data: data });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Internal Server Error", data: null });
        });
}

/**
 * This function displays a single building by ID in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayBuildingById(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a building", data: "" });
    } else {
        Building.findById({ _id: id })
            .then((data) => {
                if (data) {
                    res.status(200).json({ success: true, msg: "Building Retrieved and Displayed", data: data });
                } else {
                    res.status(404).json({ success: false, msg: "Building not found", data: "" });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, msg: "Internal Server Error", data: null });
            });
    }
}

/**
 * This function adds a building to the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function AddBuilding(req: Request, res: Response, next: NextFunction): void {
    let building = new Building({
        name: req.body.name,
        type: req.body.type,
        dateBuilt: req.body.dateBuilt,
        city: req.body.city,
        country: req.body.country,
        description: req.body.description,
        architects: req.body.architects,
        cost: req.body.cost,
        website: req.body.website,
        imageURL: req.body.imageURL
    });

    Building.create(building)
        .then(() => {
            res.status(200).json({ success: true, msg: "Building added", data: building });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Internal Server Error", data: null });
        });
}

/**
 * This function updates a building in the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateBuilding(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a building", data: "" });
    } else {
        let buildingToUpdate = new Building({
            _id: id,
            name: req.body.name,
            type: req.body.type,
            dateBuilt: req.body.dateBuilt,
            city: req.body.city,
            country: req.body.country,
            description: req.body.description,
            architects: req.body.architects,
            cost: req.body.cost,
            website: req.body.website,
            imageURL: req.body.imageURL
        });

        Building.updateOne({ _id: id }, buildingToUpdate)
            .then(() => {
                res.status(200).json({ success: true, msg: "Building updated", data: buildingToUpdate });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, msg: "Internal Server Error", data: null });
            });
    }
}

/**
 * This function deletes a building from the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DeleteBuilding(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    if (id.length !== 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a building", data: "" });
    } else {
        Building.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json({ success: true, msg: "Building deleted", data: id });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, msg: "Internal Server Error", data: null });
            });
    }
}
