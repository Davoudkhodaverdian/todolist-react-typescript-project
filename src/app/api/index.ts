import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from './getBaseUrl'


const baseUrl = getBaseUrl();
export const todoApi = createApi({
    reducerPath: "todoApi",
    tagTypes:["Todo"],
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => "/api/admin/todolist",
            providesTags:["Todo"]
        }),
        addTodo: builder.mutation({
            query: (input) => ({
                url:  "/api/admin/todolist",
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'charset': 'utf-8 ' },
                body: { text: input, done: false }
            }),
            invalidatesTags:["Todo"]
        }),
        
        editTodo: builder.mutation({
            query: ({id,body}) => ({
                url:  `/api/admin/todolist/${id}`,
                method: "PUT",
                headers: { 'Content-Type': 'application/json', 'charset': 'utf-8 ' },
                body: body
            }),
            invalidatesTags:["Todo"]
        }),
        removeTodo: builder.mutation({
            query: (id) => ({
                url:  `/api/admin/todolist/${id}`,
                method: "DELETE",
                headers: { 'Content-Type': 'application/json', 'charset': 'utf-8 ' }
            }),
            invalidatesTags:["Todo"]
        })
    })

})

export const { useGetTodosQuery,useAddTodoMutation,useEditTodoMutation,useRemoveTodoMutation } = todoApi