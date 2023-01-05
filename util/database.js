const mongodb = require('mongodb');
const mongoclient = mongodb.MongoClient;
let _db;

const mongoconnect = callback => {
    mongoclient.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PSWD}@cluster1.h2hsonw.mongodb.net/shop?retryWrites=true&w=majority`)
    .then(client => {
        console.log("connected!");
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log("error connecting!");
        throw err;
    });
}

const getdb = ()=>{
    if(_db){
        return _db;
    }
    throw "database not found!"
}

exports.mongoconnect = mongoconnect;
exports.getdb = getdb;