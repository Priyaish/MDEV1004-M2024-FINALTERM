/**
 * File: buildingModel.ts
 * Author: Priyanka Saxena
 * StudentID: 200583643
 * Date: 2024-08-17
 */

import { Schema, model, Document } from 'mongoose';

// Define the IBuilding interface

interface IBuilding extends Document {
  id?: string; // Optional for the Mongoose document ID
  buildingID: string; // Required as per the provided data
  name: string;
  location: string; // Changed from 'type' to 'location'
  dateBuilt: number; // Changed from 'yearBuilt' to 'dateBuilt'
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
  id: { type: String },
  buildingID: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true }, // Changed from 'type' to 'location'
  dateBuilt: { type: Number, required: true }, // Changed from 'yearBuilt' to 'dateBuilt'
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  architects: { type: [String], required: true },
  cost: { type: Number, required: true },
  website: { type: String, required: true },
  imageURL: { type: String, required: true }
}, { timestamps: true }); // Added timestamps to automatically manage createdAt and updatedAt fields

const Building = model<IBuilding>('Building', buildingSchema);

export default Building;
