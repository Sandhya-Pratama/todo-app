import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const TodoItem = ({ todo }) => {
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
        <Box color={"green.500"} cursor={"pointer"}>
          <FaCheckCircle size={20} />
        </Box>
        <Box color={"red.500"} cursor={"pointer"}>
          <MdDelete size={25} />
        </Box>
      </Flex>
    </Flex>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
export default TodoItem;
