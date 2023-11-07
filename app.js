const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Database configuration and connection
const db = require('./config/database');
db.connect();

// Load routes
const customerRoutes = require('./routes/customerRoutes');
const loanRoutes = require('./routes/loanRoutes');

// Use routes
app.use('/customers', customerRoutes);
app.use('/loans', loanRoutes);

app.listen(port, (err) => {
  if(err)throw err;
  console.log(`Server is running on port: http://localhost:${port}`);
});
