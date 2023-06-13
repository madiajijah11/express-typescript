import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Task } from "../models/task";

const router = Router();
let tasks: Task[] = [];

const taskValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("complete").isBoolean().withMessage("Complete is required"),
];

// create a task
router.post("/", taskValidation, (req: Request, res: Response) => {
  const task: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    complete: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

// get all tasks
router.get("/", (req: Request, res: Response) => {
  res.status(200).json(tasks);
});

// get a task
router.get("/:id", (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) {
    res.status(404).json({ message: "Task not found" });
  } else {
    res.status(200).json(task);
  }
});

// update a task
router.put("/:id", taskValidation, (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) {
    res.status(404).json({ message: "Task not found" });
  } else {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.complete = req.body.complete || task.complete;

    res.status(200).json(task);
  }
});

// delete a task
router.delete("/:id", (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));

  if (index < 0) {
    res.status(404).json({ message: "Task not found" });
  } else {
    tasks.splice(index, 1);
    res.status(200).json({ message: "Task deleted" });
  }
});

export default router;
