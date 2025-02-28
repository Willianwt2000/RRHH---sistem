import express from "express";
import { listOfAccount } from "./data.js";
const port = 8000;
const app = express();
app.use(express.json());
app.listen(port, () => {
    console.log(`Server listening at port ${port}.`);
});
/* Account service
 */
app.get("/account/login", (request, response) => {
    console.log("Hola");
    response.status(200).json(listOfAccount);
});
