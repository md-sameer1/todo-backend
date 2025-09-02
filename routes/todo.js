const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

//NOTE - get all todo's

router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find();
    res.status(200).json(todo);
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      error: "Failed to fetch todos",
    });
  }
});

//NOTE -  create a todo

router.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    //validation of Task

    if (!task || task.trim() === "") {
      return res.status(400).json({
        error: "Task is required !",
      });
    }

    const newTask = await Todo.create({ task });

    if (!newTask) {
      return res
        .status(500)
        .json({ error: "something went worng while creating task" });
    }

    res.status(201).json(newTask);
  } catch (err) {
    console.log("Failed to create a todo!");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }
    const updatedData = req.body;

    if (!updatedData) {
      return res.status(400).json({ error: "Task is required" });
    }

    const updatedTask = await Todo.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedTask) {
      return res
        .status(500)
        .json({ error: "Something went wrong while updating task" });
    }
    return res.status(200).json(updatedTask);
  } catch (err) {
    console.log("Something went wrong : ", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    const del = await Todo.findByIdAndDelete(id);

    if (!del) {
      res.status(404).json({ error: "Task Not found!" });
    }

    return res.status(200).json({ success: "Task deleted successfully", del });
  } catch (error) {
    console.log("something went wrong while deleting the task", err);
    res
      .status(500)
      .json({ error: "Something went wrong while deleting the task" });
  }
});

module.exports = router;
