const Todo = require("../models/Todo.model");

module.exports.todoscontroller = {
  getTodo: async (req, res) => {
    try {
      const todo = await Todo.find({});
      res.json(todo);
    } catch (error) {
      res.json("failed to get info");
    }
  },
  addTodo: async (req, res) => {
    try {
      const todo = await Todo.create({ title: req.body.title });
      res.json(todo);
    } catch (error) {
      res.json("failed to add todo");
    }
  },
  updateTodo: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, {completed: req.body.completed}, {new: true});
      res.json(todo);
    } catch (error) {
      res.json("failed to change todo");
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      res.json("todo has been deleted");
    } catch (error) {
      res.json("failed to delete todo");
    }
  },
};
