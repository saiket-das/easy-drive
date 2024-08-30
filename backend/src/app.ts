import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// parsers
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://r.stripe.com/b"],
    credentials: true,
  })
);

// routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Car rental server is running!");
});

// Global error handler
app.use(globalErrorHandler);

// Not found or 404 route
app.use(notFound);

export default app;
