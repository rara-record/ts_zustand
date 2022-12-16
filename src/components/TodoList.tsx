import * as React from 'react';
import { Button, Input, Flex, Checkbox, Heading } from '@chakra-ui/react';
import useStore from '../store';

function TodoListItems() {
  const store = useStore((state) => state);

  return (
    <>
      {store.todos.map((todo) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox
            checked={todo.done}
            onClick={() => store.toggleTodo(todo.id)}
          />
          <Input
            mx={2}
            value={todo.text}
            onChange={(e) => store.updateTodo(todo.id, e.target.value)}
          />
          <Button onClick={() => store.removeTodo(todo.id)}>Delete</Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
}

export default TodoList;
