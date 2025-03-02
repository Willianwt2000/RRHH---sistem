import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import employeeRouter from "./routes/employeeRoutes";
import payrollRouter from "./routes/payrollRoutes";
import cargoRouter from "./routes/cargoRoutes";
import poncheRouter from "./routes/poncheRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const port: number = 8000;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para procesar el cuerpo de las solicitudes JSON

// Rutas
app.use("/account", authRouter);
app.use("/employee", employeeRouter);
app.use("/nomina", payrollRouter);
app.use("/ponche", poncheRouter);
app.use("/cargo", cargoRouter);


app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server listening at port http://localhost:${port}`);
});