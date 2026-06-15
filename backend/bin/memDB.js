import { MongoMemoryServer } from 'mongodb-memory-server'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

// get dir of the current file
const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (!fs.existsSync(path.resolve(__dirname, './storage'))) {
  fs.mkdirSync(path.resolve(__dirname, './storage'))
}

async function startMongoServer() {
  const mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbName: 'payload',
      dbPath: path.resolve(__dirname, './storage'),
      storageEngine: 'wiredTiger',
    },
  })
  const mongoUri = mongoServer.getUri()
  console.log('MongoDB URI:', mongoUri)
}

startMongoServer()
