const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://sloktulsyan:3ab8zgzJOQrTaMwc@todo-and-expense.0y1v8.mongodb.net/?retryWrites=true&w=majority&appName=Todo-and-expense"

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