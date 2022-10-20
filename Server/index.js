var db = require('./dboperations');
var Customer = require('./Customer');
const express = require('express');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello Server!' }));

app.get('/customers', (req, res) => {
  db.getCustomers().then((data) => {
    var customers = [];
    data[0].forEach(function (customer) {
      customers.push(
        new Customer(
          customer.CustomerID,
          customer.CustomerName,
          customer.Age,
          customer.CustomerTP,
          customer.CustomerAddress
        )
      );
    });
    res.json(customers);
  });
});

app.get('/customers/:id', (req, res) => {
  db.getCustomer(req.params.id).then((data) => {
    var customer = data[0].map(function (customer) {
      return new Customer(
        customer.CustomerID,
        customer.CustomerName,
        customer.Age,
        customer.CustomerTP,
        customer.CustomerAddress
      );
    });
    res.json(customer);
  });
});

app.post('/customers', (req, res) => {
  db.addCustomer(req.body).then((data) => {
    res
      .status(201)
      .json({ message: 'Customer added successfully', data: data[0] });
  });
});

app.listen(3000, () => console.log(' listening on port 3000!'));
