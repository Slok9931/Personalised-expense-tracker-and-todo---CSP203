const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/CSP203"

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
const mongo = mongoose.connection;
mongo.on("error", console.error.bind(console, "Connection error: "));
mongo.once("open", () => {
    console.log("Database Connected");
})
}
module.exports = connectToMongo;