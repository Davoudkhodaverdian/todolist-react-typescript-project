import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../../components/models/todo";

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state = action.payload;
            return state;
        },
        editTodo: (state, action: PayloadAction<Todo>) => {
            state = state.map((todo: Todo) => (todo.id === action.payload.id ? action.payload : todo));
            return state;
        },
    }
})

export const { setTodos,editTodo } = todoSlice.actions;

export default todoSlice.reducer;