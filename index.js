const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require('./app/routes/index')
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

// const db = require("./app/models");
// db.sequelize.sync({
//   force: true
// }).then(() => {

//   console.log("Drop and re-sync db.");

// });

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', router)

app.get("/", (req, res) => {
  res.json({
    message: "hello"
  });
});

// const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});