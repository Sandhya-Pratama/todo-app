import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const { mutate: updateTodo, isPending: IsUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (todo.completed) return alert("Todo Already Completed");
      try {
        const response = await fetch(
          `http://localhost:5000/todos/${todo._id}`,
          {
            method: "PUT",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/todos/${todo._id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return (
    <Flex gap={2} alignItems={"center"}>
      <Flex
        flex={1}
        alignItems={"center"}
        border={"1px solid"}
        borderColor={"whiteAlpha.800"}
        p={2}
        borderRadius={"lg"}
        justifyContent={"space-between"}
        bg="blackAlpha.500" /* Setel background putih transparan */
        backdropFilter="blur(10px)" /* Efek blur pada latar belakang */
      >
        <Text
          color={todo.completed ? "green.300" : "yellow.300"}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.body}
        </Text>
        {todo.completed && <Badge colorPalette="green">Done</Badge>}
        {!todo.completed && <Badge colorPalette="yellow"> In Progress </Badge>}
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Box
          color={"green.500"}
          cursor={"pointer"}
          onClick={() => updateTodo()}
        >
          {!IsUpdating && <FaCheckCircle size={25} />}
          {IsUpdating && <Spinner size={"sm"} />}
        </Box>
        <Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
          {!isDeleting && <MdDelete size={25} />}
          {isDeleting && <Spinner size={"sm"} />}
        </Box>
      </Flex>
    </Flex>
  );
};
TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Ubah dari number ke string
    body: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
