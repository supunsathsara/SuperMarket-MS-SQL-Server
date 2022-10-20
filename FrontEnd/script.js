fetch('http://localhost:3000/customers')
  .then((response) => response.json())
  .then((customers) => {
    const customerData = document.getElementById('customer-table');
    customers.forEach((customer) => {
      const customerdiv = document.createElement('tr');
      customerdiv.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.age}</td>
            <td>${customer.address}</td>
            <td>${customer.telephone}</td>
            `;
      customerData.appendChild(customerdiv);
      const id = document.getElementById('cID');
      console.log(customer.id[-1]);
      //id.value = customer.id + 1;
    });
  });

class Customer {
  constructor(id, name, age, address, telephone) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.address = address;
    this.telephone = telephone;
  }
}

function loadCustomers() {
  //clear the table
  const customerData = document.getElementById('customer-table');
  //customerData.innerHTML = '';
  fetch('http://localhost:3000/customers')
    .then((response) => response.json())
    .then((customers) => {
      //const customerData = document.getElementById('customer-table');
      customers.forEach((customer) => {
        const customerdiv = document.createElement('tr');
        customerdiv.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.age}</td>
            <td>${customer.address}</td>
            <td>${customer.telephone}</td>
            `;
        customerData.appendChild(customerdiv);
      });
    });
}

function addCustomer(customer) {
  //send a post request to the server
  fetch('http://localhost:3000/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });
}

const customerForm = document.getElementById('customer-form');
customerForm.addEventListener('submit', (event) => {
  //event.preventDefault();
  const id = document.getElementById('cID').value;
  const name = document.getElementById('cName').value;
  const age = document.getElementById('cAge').value;
  const address = document.getElementById('cAddress').value;
  const telephone = document.getElementById('cTele').value;
  const customer = new Customer(id, name, age, address, telephone);
  console.log(JSON.stringify(customer));
  addCustomer(customer);
  loadCustomers();
});
