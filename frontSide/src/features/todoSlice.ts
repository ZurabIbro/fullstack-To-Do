import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: []
};

export const fetchTodos = createAsyncThunk('todos/fetch', async (data, thunkApi) => {
    try{
        const response = await fetch('http://localhost:5000/todo')
        const todos = await response.json()
        return thunkApi.fulfillWithValue(todos)
    }catch (error){
        return thunkApi.rejectWithValue(error)
    }
});

export const deleteTodos = createAsyncThunk('todos/delete', async (data, thunkApi) => {
    try{
        const response = await fetch(`http://localhost:5000/todo/${data}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        return thunkApi.fulfillWithValue(data)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const addTodos = createAsyncThunk('todos/add', async (data, thunkApi) => {
    try{
        const response = await fetch(`http://localhost:5000/todo`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: data,
                completed: false
            })
        })
        const todo = await response.json()
        return thunkApi.fulfillWithValue(todo)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const saveTodos = createAsyncThunk('todos/save', async (data, thunkApi) => {
    try{
        const response = await fetch(`http://localhost:5000/todo/${data.id}`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                completed: !data.completed
            })
        })
        const todo = await response.json()
        return thunkApi.fulfillWithValue(todo)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload
    })
    .addCase(deleteTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item) => item._id !== action.payload)
    })
    .addCase(addTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload) 
    })
    .addCase(saveTodos.fulfilled, (state, action) => {
        state.todos = state.todos.map((item) => {
            if(item._id === action.payload._id){
                return action.payload
            }
            return item
        })
    })
  },
});

export default todoSlice.reducer
