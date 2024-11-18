const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
connectToMongo();
const app = express();
app.use(cors());
const port = 2000;
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expense'));
app.use('/api/todos', require('./routes/todo'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})