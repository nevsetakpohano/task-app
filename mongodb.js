// CRUD create read update delete

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

async function main() {
    const client = new MongoClient(connectionURL)

    try {
        // Connect the client to the server
        await client.connect()
        console.log('Connected successfully to database!')

        const db = client.db(databaseName)
        
        // 1. Insert sample tasks (creates the 'tasks' collection)
        const tasksCollection = db.collection('tasks')
        const insertTasks = await tasksCollection.insertMany([
            {
                description: 'Clean the house',
                completed: true
            },
            {
                description: 'Pot plants',
                completed: false
            },
            {
                description: 'Do laundry',
                completed: false
            }
        ])
        console.log('Inserted tasks:', insertTasks.insertedIds)

        // 2. Insert sample users (creates the 'users' collection)
        const usersCollection = db.collection('users')
        const insertUsers = await usersCollection.insertMany([
            {
                name: 'Andrew',
                age: 27
            },
            {
                name: 'Viktor',
                age: 30
            }
        ])
        console.log('Inserted users:', insertUsers.insertedIds)

        // 3. Delete a task (original logic from the delete lesson)
        const deleteResult = await tasksCollection.deleteOne({
            description: 'Clean the house'
        })
        console.log('Delete result:', deleteResult)

    } catch (error) {
        console.log('Unable to connect to database!', error)
    } finally {
        // Close the connection
        await client.close()
    }
}

main().catch(console.error)
