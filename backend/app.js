const express = require("express");
const morgan = require("morgan");
const cors =require('cors');
const bodyParser =require('body-parser')

const customerRouter = require('./routes/customerRoutes');
const driverRouter = require('./routes/driverRoutes')
const fleetRouter = require('./routes/fleetRoutes')
const inventoryRouter = require('./routes/inventoryRoutes')
const orderRouter = require('./routes/orderRoutes')
const orderItemRouter = require('./routes/orderItemRoutes');
const productRouter = require('./routes/productRoutes')
const shipmentRouter = require('./routes/shipmentRoutes')
const supplierRouter = require('./routes/supplierRoutes')
const transportLogRouter = require('./routes/transportLogRoutes')
const warehouseRouter = require('./routes/warehouseRoutes')

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
app.use('/api/v1/inventory', inventoryRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/orderIetems', orderItemRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/shipments', shipmentRouter);
app.use('/api/v1/suppliers', supplierRouter);
app.use('/api/v1/transportLogs',transportLogRouter);
app.use('/api/v1/warehouses', warehouseRouter);


module.exports = app;