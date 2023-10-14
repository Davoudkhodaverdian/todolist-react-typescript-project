
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../app/store";
import Loading from "../loading";
import { setTodos } from "../../app/store/todoSlice";
import getBaseUrl from "../../app/api/getBaseUrl";
import { useAddTodoMutation } from "../../app/api";


const AddTodo: React.FC = () => {

    const [input, setInput] = useState<string>("");
    // const [loading, setLoading] = useState<boolean>(false);
    const inputHandler: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setInput(event.target.value) };
    // const dispatch = useDispatch<AppDispatch>();
    const[addTodo,{isLoading}] = useAddTodoMutation();
    const submitHandler: React.FormEventHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (input.length > 0) {
            //setLoading(true)
            try {
                // let res = await fetch(`${getBaseUrl()}/api/admin/todolist`, {
                //     method: "POST",
                //     body: JSON.stringify({ text: input, done: false }),
                //     headers: { 'Content-Type': 'application/json', 'charset': 'utf-8 ' }
                // });
                // const data = await res.json();
                const data = await addTodo(input);
                if ((data as any)?.status === 200) {
                    //dispatch(setTodos(data.data))
                    toast(<div className='vazir-matn-font'>مورد نظر اضافه شد todo</div>)
                }
                else console.log(data)

            } catch (error) { console.log(error) }
            // setLoading(false);
            setInput("");
        } else { alert("مقداری وارد نشده") }
    }

    return (
        <form onSubmit={submitHandler} className="flex mt-4">
            <input className="shadow border rounded w-full p-2 mr-4 text-gray-700" placeholder="Add Todo"
                value={input} onChange={inputHandler} />
            <button type="submit"
                className="p-2 rounded text-white text-center bg-violet-500 font-bold drop-shadow hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300  mx-1">
                <div className='flex'>
                    <div className="mx-1">{isLoading ? <Loading /> : ""}</div>
                    <div>افزودن</div>
                </div>
            </button>
        </form>
    )
}

export default AddTodo;