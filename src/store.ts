import create from 'zustand';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const addTodo = (todos: Todo[], text: string) => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const removeTodo = (todos: Todo[], id: number) =>
  todos.filter((todo) => todo.id !== id);

const toggleTodo = (todos: Todo[], id: number) =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

type Store = {
  todos: Todo[];
  newTodo: string;
  setTodos: (todos: Todo[]) => void;
  setNewTodo: (newTodo: string) => void;
  addTodo: () => void;
  updateTodo: (id: number, text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  load: (todos: Todo[]) => void;
};

const useStore = create<Store>(
  (set): Store => ({
    todos: [],
    newTodo: '',
    load(todos: Todo[]) {
      set((state) => ({
        ...state,
        todos,
      }));
    },
    setTodos: (todos: Todo[]) =>
      set((state) => ({
        ...state,
        todos,
      })),
    removeTodo: (id: number) =>
      set((state) => ({
        ...state,
        todos: removeTodo(state.todos, id),
      })),
    updateTodo: (id: number, text: string) =>
      set((state) => ({
        ...state,
        todos: updateTodo(state.todos, id, text),
      })),
    toggleTodo: (id: number) =>
      set((state) => ({
        ...state,
        todos: toggleTodo(state.todos, id),
      })),
    setNewTodo: (newTodo: string) =>
      set((state) => ({
        ...state,
        newTodo,
      })),
    addTodo: () =>
      set((state) => ({
        ...state,
        todos: addTodo(state.todos, state.newTodo),
        newTodo: '',
      })),
  })
);

export default useStore;
