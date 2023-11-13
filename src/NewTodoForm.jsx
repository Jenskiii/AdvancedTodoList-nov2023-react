import { useContext, useRef } from "react";
import { TodoContext } from "./App";

export function NewTodoForm() {
  // use ref instead of useState so you dont need to pass in a prop
  const nameRef = useRef();
  // imports todo functions with useContext
  const { addNewTodo } = useContext(TodoContext);
  function handleSubmit(e) {
    // if input value is empty return
    if (nameRef.current.value === "") return;
    e.preventDefault();

    addNewTodo(nameRef.current.value);
    // reset input value after creating todo
    nameRef.current.value = "";
  }
  return (
    <>
      <form onSubmit={handleSubmit} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input autoFocus type="text" id="todo-input" ref={nameRef} />
        <button>Add Todo</button>
      </form>
    </>
  );
}
