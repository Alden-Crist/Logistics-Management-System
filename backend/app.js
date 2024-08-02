const express = require("express");
const morgan = require("morgan");
const cors =require('cors');
const bodyParser =require('body-parser')
const customerRouter = require('./routes/customerRoutes');
const warehouseRouter = require('./routes/warehouseRoutes')
const driverRouter = require('./routes/driverRoutes')
const fleetRouter = require('./routes/fleetRoutes')
const supplierRouter = require('./routes/supplierRoutes')

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use(express.json());


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(morgan("dev"));

app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/drivers', driverRouter);
app.use('/api/v1/fleets', fleetRouter);
// app.use('/api/v1/inventory', recordRouter);
// app.use('/api/v1/orders', customerRouter);
// app.use('/api/v1/orderItems', doctorRouter);
// app.use('/api/v1/products', adminRouter);
// app.use('/api/v1/shipments', recordRouter);
app.use('/api/v1/suppliers', supplierRouter);
// app.use('/api/v1/transportLogs',consultRouter);
 app.use('/api/v1/warehouses', warehouseRouter);


module.exports = app;