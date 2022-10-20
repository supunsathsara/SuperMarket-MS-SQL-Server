var config = require('./dbconfig');
const sql = require('mssql');

async function getCustomers() {
  try {
    let pool = await sql.connect(config);
    let customers = await pool.request().query('SELECT * FROM Customer');
    return customers.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//getcutomer by id
async function getCustomer(id) {
  try {
    let pool = await sql.connect(config);
    let customer = await pool
      .request()
      .input('input_parameter', sql.NVarChar, id)
      .query('SELECT * FROM Customer WHERE CustomerID = @input_parameter');
    return customer.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addCustomer(customer) {
  try {
    let pool = await sql.connect(config);
    let insertCustomer = await pool
      .request()
      .input('CustomerID', sql.NVarChar, customer.id)
      .input('CustomerName', sql.NVarChar, customer.name)
      .input('Age', sql.Int, customer.age)
      .input('CustomerTP', sql.NVarChar, customer.telephone)
      .input('CustomerAddress', sql.NVarChar, customer.address)
      .query(
        'INSERT INTO Customer(CustomerID,CustomerName,Age,CustomerTP,CustomerAddress) VALUES (@CustomerID,@CustomerName,@Age,@CustomerTP,@CustomerAddress)'
      );
    return insertCustomer.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getOrders() {
  try {
    let pool = await sql.connect(config);
    let orders = await pool.request().query('SELECT * FROM Orders');
    return orders.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCustomers,
  getCustomer,
  addCustomer,
};
