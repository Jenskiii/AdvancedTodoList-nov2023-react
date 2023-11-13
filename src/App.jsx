import { createContext, useEffect, useReducer, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import { TodoFilterForm } from "./TodoFilterForm";
// local storage name
const LOCAL_STORAGE_KEY = "TODOS";
// actions for usereducer
const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
};
// usereduced function
function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];

    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, completed: payload.completed };
        }

        return todo;
      });

    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id);

    case ACTIONS.UPDATE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          // return everything from todo, but update name
          return { ...todo, name: payload.name };
        }
        // if dont match return excisting todo
        return todo;
      });
    default:
      throw new Error(`no action found for ${type}`);
  }
}
// useContect
export const TodoContext = createContext();
function App() {
  // these 2 need to be global
  // filter value
  const [filterName, setFilterName] = useState("");
  // value to show/hide completed
  const [hideCompletedFilter, setHideCompletedFilter] = useState(false);
  // save todos + to localstorage
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    // saves value to localStorage
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (value === null) return initialValue;

    return JSON.parse(value);
  });

  //  updates localstorage when value updates
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // filter values
  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } });
  }

  function updateTodoName(id, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id, name } });
  }

  // filter todos
  const filteredTodos = todos.filter((todo) => {
    // filters out checked todo / checkbox needs to be checked
    if (hideCompletedFilter && todo.completed) return false;

    return todo.name.includes(filterName);
  });

  return (
    <>
      <TodoContext.Provider
        value={{
          todos: filteredTodos,
          addNewTodo,
          toggleTodo,
          deleteTodo,
          updateTodoName,
        }}
      >
        <TodoFilterForm
          name={filterName}
          setName={setFilterName}
          hideCompleted={hideCompletedFilter}
          setHideCompleted={setHideCompletedFilter}
        />
        <TodoList />
        <NewTodoForm />
      </TodoContext.Provider>
    </>
  );
}

export default App;
