const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./app');

const port = config.port;
const connectionString = config.mongoose.url;
const connectionOptions = config.mongoose.options;

mongoose.connect(connectionString, connectionOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Welcome to QKart!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});