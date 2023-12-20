const { Router } = require ('express')
const {todoscontroller} = require('../controllers/todo.controller')

const router = Router()

router.get('/todo', todoscontroller.getTodo)
router.post('/todo', todoscontroller.addTodo)
router.patch('/todo/:id', todoscontroller.updateTodo)
router.delete('/todo/:id', todoscontroller.deleteTodo)

module.exports = router