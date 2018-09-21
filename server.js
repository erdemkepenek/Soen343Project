const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe', email: "johndoe@hotmail.com", phone: 5143295432, address: "532 Rue Carlton Montreal, Quebec Canada, F2D6F3"},
    {id: 2, firstName: 'Brad', lastName: 'Traversy', email: "bradtraversy@gmail.com", phone: 4383220156, address: "362 Rue Crescent Montreal, Quebec Canada, B2D7D3"},
    {id: 3, firstName: 'Mary', lastName: 'Swanson', email: "maryswanson@live.com", phone: 3849361843, address: "83 Rue Clark Montreal, Quebec Canada, S2F4L9"},
  ];

  res.json(customers);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);