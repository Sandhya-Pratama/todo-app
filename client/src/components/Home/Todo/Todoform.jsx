import { IoMdAdd } from "react-icons/io";
import "./home.css";

const TodoForm = () => {
  return (
    <div className="containerform">
      <form className="todo-form" action="">
        <input
          type="text"
          id="newTodo"
          className="input"
          placeholder="Add a new todo"
        />
        <button type="submit" className="btn">
          <IoMdAdd />
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
