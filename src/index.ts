import express, { NextFunction, Request, Response } from "express";
import tasksRoutes from "./routes/tasks";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/tasks", tasksRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
