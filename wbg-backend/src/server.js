require("dotenv").config();
import express from "express";
import configCors from "./config/cors.js";
import initApiRoutes from "./routes/api.js";

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//Config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config CORS
configCors(app);

initApiRoutes(app);

app.listen(port, hostname, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
});
