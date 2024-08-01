const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alden@88',
    database: 'logistic_management'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }

    console.log('Connected to the database.');

    const createTablesQueries = [
        {
            name: 'customers',
            query: `
                CREATE TABLE IF NOT EXISTS customers (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    phone VARCHAR(20),
                    address VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'suppliers',
            query: `
                CREATE TABLE IF NOT EXISTS suppliers (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    contact_name VARCHAR(255),
                    phone VARCHAR(20),
                    email VARCHAR(100),
                    address VARCHAR(200),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'products',
            query: `
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    description TEXT,
                    price DECIMAL(10, 2),
                    stock_quantity INT DEFAULT 0,
                    supplier_id INT,
                    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'orders',
            query: `
                CREATE TABLE IF NOT EXISTS orders (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    customer_id INT,
                    order_date DATE,
                    status VARCHAR(50),
                    total_amount DECIMAL(10, 2),
                    FOREIGN KEY (customer_id) REFERENCES customers(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'order_items',
            query: `
                CREATE TABLE IF NOT EXISTS order_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    order_id INT,
                    product_id INT,
                    quantity INT,
                    price DECIMAL(10, 2),
                    FOREIGN KEY (order_id) REFERENCES orders(id),
                    FOREIGN KEY (product_id) REFERENCES products(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'shipments',
            query: `
                CREATE TABLE IF NOT EXISTS shipments (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    order_id INT,
                    shipment_date DATE,
                    delivery_date DATE,
                    status VARCHAR(50),
                    tracking_number VARCHAR(255),
                    FOREIGN KEY (order_id) REFERENCES orders(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'warehouses',
            query: `
                CREATE TABLE IF NOT EXISTS warehouses (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    location VARCHAR(255),
                    capacity INT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'inventory',
            query: `
                CREATE TABLE IF NOT EXISTS inventory (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    product_id INT,
                    warehouse_id INT,
                    quantity INT,
                    FOREIGN KEY (product_id) REFERENCES products(id),
                    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'fleet',
            query: `
                CREATE TABLE IF NOT EXISTS fleet (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    vehicle_number VARCHAR(50) NOT NULL,
                    vehicle_type VARCHAR(50),
                    capacity INT,
                    status VARCHAR(50),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'drivers',
            query: `
                CREATE TABLE IF NOT EXISTS drivers (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    license_number VARCHAR(50),
                    phone VARCHAR(20),
                    assigned_vehicle_id INT,
                    FOREIGN KEY (assigned_vehicle_id) REFERENCES fleet(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        },
        {
            name: 'transport_logs',
            query: `
                CREATE TABLE IF NOT EXISTS transport_logs (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    shipment_id INT,
                    vehicle_id INT,
                    driver_id INT,
                    start_time TIMESTAMP,
                    end_time TIMESTAMP,
                    FOREIGN KEY (shipment_id) REFERENCES shipments(id),
                    FOREIGN KEY (vehicle_id) REFERENCES fleet(id),
                    FOREIGN KEY (driver_id) REFERENCES drivers(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `
        }
    ];

    createTablesQueries.forEach(({ name, query }) => {
        db.query(query, (err, results) => {
            if (err) {
                console.error(`Error creating table ${name}:`, err.stack);
                return;
            }
            console.log(`Table ${name} created or already exists.`);
        });
    });

    
});

module.exports = db;
