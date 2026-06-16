const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

async function main() {
    const client = new MongoClient(connectionURL)

    try {
        await client.connect()
        console.log('Connected successfully to database!')

        const db = client.db(databaseName)
        
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

        const deleteResult = await tasksCollection.deleteOne({
            description: 'Clean the house'
        })
        console.log('Delete result:', deleteResult)

    } catch (error) {
        console.log('Unable to connect to database!', error)
    } finally {
        await client.close()
    }
}

main().catch(console.error)
