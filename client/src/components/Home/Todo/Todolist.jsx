import { Flex, Spinner, Container, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import TodoItem from "./Todoitem";

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const todos = [
    {
      _id: 1,
      body: "Buy groceries",
      completed: true,
    },
    {
      _id: 2,
      body: "Walk the dog",
      completed: false,
    },
    {
      _id: 3,
      body: "Do laundry",
      completed: false,
    },
    {
      _id: 4,
      body: "Cook dinner",
      completed: true,
    },
  ];
  return (
    <>
      <div className="todo">
        <Container maxW={"700px"}>
          <Text
            fontSize={"4xl"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            textAlign={"center"}
            my={2}
            bgGradient="to-l"
            gradientFrom="cyan.400"
            gradientTo="purple.fg"
            bgClip="text"
          >
            Today's Tasks
          </Text>
          {isLoading && (
            <Flex justifyContent={"center"} my={4}>
              <Spinner size={"xl"} />
            </Flex>
          )}
          {!isLoading && todos?.length === 0 && (
            <Stack alignItems={"center"} gap="3">
              <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
                All tasks completed! 🤞
              </Text>
              <img src="/go.png" alt="Go logo" width={70} height={70} />
            </Stack>
          )}
          <Stack gap={3}>
            {todos?.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </Stack>
        </Container>
      </div>
    </>
  );
};
export default TodoList;
