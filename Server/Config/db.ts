/**
 * File: db.ts
 * Author: Priyanka Saxena
 * StudentID: 200583643
 * Date: 2024-06-21
 */

import dotenv from 'dotenv';
dotenv.config(); // Ensure dotenv is loaded

const remoteURI = process.env.MONGO_URI as string;

if (!remoteURI) {
    throw new Error('MONGO_URI is not defined in environment variables');
}

export default {
    remoteURI: remoteURI,
};