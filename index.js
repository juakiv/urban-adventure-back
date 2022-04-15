const express = require("express");
const app = express();

const Server = require("./src/Server");

app.use(express.static("build"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
  let server = new Server();
  
});
