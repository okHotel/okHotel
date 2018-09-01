const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');

const customerRoutes = require('./routes/customer.routes');
const bookingRoutes = require('./routes/booking.routes');
const authenticationRoutes = require('./routes/authentication.routes');
const menuRoutes = require('./routes/menu.routes');
const planRoutes = require('./routes/plans.routes');
const productRoutes = require('./routes/products.routes');

const variationRoutes = require('./routes/variation.routes');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.database, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    }).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/customers', customerRoutes);
app.use('/bookings', bookingRoutes);
app.use('/auth', authenticationRoutes);
app.use('/menu', menuRoutes);
app.use('/plan', planRoutes);
app.use('/product', productRoutes);
app.use('/variations', variationRoutes);


// Create a Server
const server = app.listen(3000, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})
