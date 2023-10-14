
import React, { useState } from "react";
import AddTodo from "./addTodo";
import Todo from "../models/todo";
import Row from "./row";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect } from 'react';
import Filter from "./filter";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../../app/store/todoSlice";
import getBaseUrl from "../../app/api/getBaseUrl";
import { useGetTodosQuery } from "../../app/api";
import Loading from "../loading";

const TodoList: React.FC = () => {

  // const todos = useSelector((state: RootState) => state.todo);
  const { data, isLoading,error,isError } = useGetTodosQuery("");
  const [SelectedIndex, setSelectedIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
console.log({ data, isLoading,error,isError })
  // not use else with rtk query
  const getTodos = async () => {
    try {
      // Fetch data from external API
      // const res = await fetch(`${getBaseUrl()}/api/admin/todolist`)
      //const data = await res.json();
      // if (data.status === 200) dispatch(setTodos(data.data))
      // else console.log(data)
    } catch (error) { console.log(error) }

  }

  //useEffect(() => { getTodos() }, []);

  const filter = (index: number, searchStr: string): Todo[] => {
    let filterTodos: Todo[] = [];
    const todos: Todo[] = data.data;
    filterTodos = todos.filter(todo => (index === 0 ? true : index === 1 ? todo.done : !todo.done));
    filterTodos = filterTodos.filter(todo => (todo.text.includes(searchStr)));
    return filterTodos;
  }
  
  return (
    <div>
      <Filter setSelectedIndex={setSelectedIndex} setSearch={setSearch} />
      <div className="w-full flex items-center justify-center" dir='ltr'>
        <div className="bg-slate-100 rounded shadow p-6 mt-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-gray-700">Todo List</h1>
            <AddTodo />
          </div>
          {isLoading ? <div className="flex justify-center"><Loading /></div> : error ?
            <div className="flex justify-center">{(error as any)?.error}</div> :
            <div className='max-h-[350px] overflow-auto shadow-inner'>
              {filter(SelectedIndex, search).map(item => (<Row key={item.id} item={item} />))}
            </div>
          }
        </div>
      </div>
    </div>
  )

}

export default TodoList;