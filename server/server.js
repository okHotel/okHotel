const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');

const Customer = require('./model/customer.model.js');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.database, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    }).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

require('./routes/customer.routes.js')(app);

// Create a Server
const server = app.listen(3000, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})
