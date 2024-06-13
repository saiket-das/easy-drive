import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
// app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

export default app;
