import { useContext, useRef, useState } from "react";
import { TodoContext } from "./App";

export function TodoItem({ id, name, completed }) {
  //  imports functions with useContext
  const { toggleTodo, deleteTodo, updateTodoName } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  // input value
  const nameRef = useRef()

  // updates todo if saved
  function handleSubmit(e){
    e.preventDefault()

    // if empte return else update todo
    if(nameRef.current.value === "") return
    // update todoName
    updateTodoName(id,nameRef.current.value)
    // change back non-edit mode
    setIsEditing(false)
  }

  return (
    <li className="list-item">
      {/* if clicked on edit will print let you adjust value else will print regular todo */}
      {isEditing ? (
       <form onSubmit={handleSubmit} action="">
        {/* autofocus will automaticly go inside the input after clicking edit */}
        <input autoFocus type="text" defaultValue={name} ref={nameRef}/>
        <button data-button-edit >
           Save
          </button>
       </form>
      ) : (
        <>
          <label className="list-item-label">
            <input
              checked={completed}
              type="checkbox"
              data-list-item-checkbox
              onChange={(e) => toggleTodo(id, e.target.checked)}
            />
            <span data-list-item-text>{name}</span>
          </label>
          <button data-button-edit onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button onClick={() => deleteTodo(id)} data-button-delete>
            Delete
          </button>
        </>
      )}
    </li>
  );
}
