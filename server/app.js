require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/tmp/my-uploads",
  express.static(path.join(__dirname, "/tmp/my-uploads"))
);

const routes = require("./routes/index");
app.use(routes);

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
