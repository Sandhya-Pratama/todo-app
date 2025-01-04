import { IoMdAdd } from "react-icons/io";
import "./home.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const { mutate: createTodo, isLoading: isCreating } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault(); // Prevent form from refreshing the page
      try {
        const res = await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: newTodo }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        setNewTodo(""); // Clear input after successful submission
        return data;
      } catch (error) {
        throw new Error(error.message || "Unknown error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className="containerform">
      <form className="todo-form" onSubmit={createTodo}>
        <input
          type="text"
          id="newTodo"
          className="input"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={(input) => input && input.focus()}
        />
        <button type="submit" className="btn">
          {isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
