import { Flex, Spinner, Container, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import TodoItem from "./Todoitem";

const TodoList = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data || [];
    },
  });
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
            animation="gradient 3s ease infinite"
          >
            Todays Tasks
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
              <img src="/sanz.png" alt="Sanz" width={70} height={70} />
            </Stack>
          )}
          {error && (
            <Text fontSize={"xl"} color={"red.500"} textAlign={"center"}>
              Error fetching tasks: {error.message}
            </Text>
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
