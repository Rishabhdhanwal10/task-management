const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting up the connection with db
require("./config/database").connect();

// getting the environment variables from config.env file
require('dotenv').config({path: './config.env'});

// use express router
app.use("/", require("./routes"));

app.listen(PORT, (err) => {
    if (err) {
      console.log(`Error in running the server: ${err}`);
      return;
    }
    console.log(`server is running on port: ${PORT}`);
});