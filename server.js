const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

app.get('/', (req, res) => {
  res.send('hello');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})