/**
 * File: buildingModel.ts
 * Author: Priyanka Saxena
 * StudentID: 200583643
 * Date: 2024-08-17
 */

import { Schema, model, Document } from 'mongoose';

// Define the IBuilding interface

interface IBuilding extends Document {
  name: string;
  type: string;
  dateBuilt: Date;
  city: string;
  country: string;
  description: string;
  architects: string[];
  cost: number;
  website: string;
  imageURL: string;
}

// Define the building schema

const buildingSchema = new Schema<IBuilding>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  dateBuilt: { type: Date, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  architects: { type: [String], required: true },
  cost: { type: Number, required: true },
  website: { type: String, required: true },
  imageURL: { type: String, required: true }
});

const Building = model<IBuilding>('Building', buildingSchema);

export default Building;

