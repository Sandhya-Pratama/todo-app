import Navbar from "./Todo/Navbar";
import TodoForm from "./Todo/Todoform";
import Todolist from "./Todo/Todolist";

import "./Todo/home.css";

const Homepage = () => {
  return (
    <>
      <div className="homepage">
        <div className="containernavbar">
          <Navbar />
          <TodoForm />
          <Todolist />
        </div>
      </div>
    </>
  );
};

export default Homepage;
