require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/index');
app.use(routes)

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
