import express from "express";
import mysql from "mysql";
import routeHandler from "./routes/routeHandlers.js";
const app = express();

// Middleware to parse only json
app.use(express.json());

// Creating connection for MySQL
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "crud"
});

// Connecting to MySQL Database
db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected");
});

// Route Handler
app.use("/", routeHandler);

app.listen(3000, () => {
  console.log("Server Listening on port 3000");
});
