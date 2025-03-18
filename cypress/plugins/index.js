const { MongoClient } = require('mongodb');

module.exports = (on, config) => {
    on('task', {
        countHospitals() {
            const uri = "mongodb://poco-develop-db-v2:E4ZolkSHGtOokz1YW7tYq4OIKTMKbBt2DQttmLBC2QmVgB49nLYMjyoT7Vvteuc9e4vH123v6vNqACDbpKseVA%3D%3D@poco-develop-db-v2.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@poco-develop-db-v2@"; // Replace with actual MongoDB URL
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

            return client.connect()
                .then(() => {
                    const db = client.db('your_database_name');
                    const collection = db.collection('companies');

                    return collection.countDocuments({ name: { $regex: "^Test Company", $options: "i" } });
                })
                .then((count) => {
                    client.close();
                    return count; // Returns the number of hospitals found
                })
                .catch((err) => {
                    console.error(err);
                    return 'Error counting hospitals';
                });
        }
    });
};
