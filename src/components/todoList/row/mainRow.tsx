
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../loading";
import Todo from "../../models/todo";
import {  editTodo, setTodos } from "../../../app/store/todoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import getBaseUrl from "../../../app/api/getBaseUrl";
import { useEditTodoMutation, useRemoveTodoMutation } from "../../../app/api";
interface Props {
    item: Todo,
    seteditItem: Dispatch<SetStateAction<boolean>>,
}

const Row: React.FC<Props> = ({ item, seteditItem }) => {

    // const [loadingRemove, setLoadingRemove] = useState<boolean>(false);
    // const [loadingDone, setLoadingDone] = useState<boolean>(false);
    // const dispatch = useDispatch<AppDispatch>();
    const[editTodo,{isLoading: loadingDone}] = useEditTodoMutation();
    const[removeTodo,{isLoading: loadingRemove}] = useRemoveTodoMutation();
    const deleteHaqndler = async (id: number) => {
        //setLoadingRemove(true)
        try {
            // let res = await fetch(`${getBaseUrl()}/api/admin/todolist/${id}`, {
            //     method: "DELETE", headers: { 'Content-Type': 'application/json', 'charset': 'utf-8 ' }
            // });
            // const data = await res.json();
            const data = await removeTodo(id).unwrap();
            if (data.status === 200) {
                // dispatch(setTodos(data.data))
                toast(<div className='vazir-matn-font'>حذف انجام شد</div>);
            }
            else console.log(data)
            
        } catch (error) { console.log(error) }
        // setLoadingRemove(false);
    }

    const editDoneHandler = async (id: number, done: boolean) => {
        // setLoadingDone(true);
        try {
            // let res = await fetch(`${getBaseUrl()}/api/admin/todolist/${id}`, {
            //     method: "PUT",
            //     body: JSON.stringify({ change: "done",value: !done }),
            //     headers: { 'Content-Type': 'application/json', 'charset': 'utf-8 ' }
            // });
            // const data = await res.json();
            const data = await editTodo({id:id,body: { change: "done",value: !done }}).unwrap();
            console.log(data)
            if (data.status === 200) {
                // dispatch(editTodo(data.data))
                toast(<div className='vazir-matn-font'>مورد نظر ویرایش شد todo</div>)
            }
            else console.log(data)
           seteditItem(false);

        } catch (error) { console.log(error) }
        // setLoadingDone(false);
    }

    const editRowHandler = () => {
        seteditItem(true);
    }

    return (
        <div className="flex mb-4 items-center justify-between p-2">
            <div onClick={editDoneHandler.bind(null, item.id, item.done)} className="cursor-pointer">
                <p className={`w-full text-ellipsis whitespace-nowrap overflow-hidden max-w-[130px] ${item.done ? "line-through text-green-700" : "text-gray-700"}`}>{item.text}</p>
            </div>
            <div className="flex">
                <button onClick={editDoneHandler.bind(null, item.id, item.done)}
                    className={`p-2 rounded text-white text-center font-bold drop-shadow focus:ring mx-1 min-w-[90px]
              ${item.done ? "hover:bg-green-600 active:bg-green-700 focus:ring-green-300 bg-green-500" : "hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300 bg-gray-500"}`}
                >
                    <div className='flex'>
                        <div className="mx-1">{loadingDone ? <Loading /> : ""}</div>
                        <div>{item.done ? "Done" : "Not done"}</div>
                    </div>
                </button>
                <button onClick={deleteHaqndler.bind(null, item.id)}
                    className="p-2 rounded text-white text-center bg-red-500 font-bold drop-shadow hover:bg-red-600 active:bg-red-700 focus:ring focus:ring-red-300  mx-1"
                >
                    <div className='flex'>
                        <div className="mx-1">{loadingRemove ? <Loading /> : ""}</div>
                        <div>حذف</div>
                    </div>
                </button>
                <button onClick={editRowHandler}
                    className="p-2 rounded text-white text-center bg-violet-500 font-bold drop-shadow hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300  mx-1"
                >ویرایش

                </button>
            </div>
        </div>
    )
}

export default Row;