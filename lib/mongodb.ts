import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MongoDB URI must be defined');
}

const client = new MongoClient(MONGODB_URI);
const clientPromise = client.connect();
export default clientPromise;