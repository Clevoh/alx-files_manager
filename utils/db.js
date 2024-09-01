import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    this.db = null;
    this.connect();
  }

  async connect() {
    try {
      const client = await MongoClient.connect(url, { useUnifiedTopology: true });
      this.db = client.db(DB_DATABASE);
      this.usersCollection = this.db.collection('users');
      this.filesCollection = this.db.collection('files');
      console.log('Connected successfully to server');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err.message);
      this.db = false;
    }
  }

  isAlive() {
    return Boolean(this.db);
  }

  async nbUsers() {
    return this.usersCollection ? this.usersCollection.countDocuments() : 0;
  }

  async nbFiles() {
    return this.filesCollection ? this.filesCollection.countDocuments() : 0;
  }
}

const dbClient = new DBClient();
export default dbClient;

