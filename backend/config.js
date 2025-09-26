import dotenv from 'dotenv';
dotenv.config();
export const PORT = 5555;

export const mongoDBURL = process.env.MONGODB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
