// import { createContext, useState, ReactNode, useContext } from 'react';

// type Todo = { id: number; text: string };

// type TodoContextType = {
//   todos: Todo[];
//   addTodo: (text: string) => void;
// };

// const TodoContext = createContext<TodoContextType | undefined>(undefined);

// export const TodoProvider = ({ children }: { children: ReactNode }) => {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   const addTodo = (text: string) => {
//     setTodos(prev => [...prev, { id: Date.now(), text }]);
//   };

//   return (
//     <TodoContext.Provider value={{ todos, addTodo }}>
//       {children}
//     </TodoContext.Provider>
//   );
// };

// export const useTodos = () => {
//   const context = useContext(TodoContext);
//   if (!context) throw new Error("useTodos must be used within TodoProvider");
//   return context;
// };









import { createContext, useState, ReactNode, useContext } from "react";

type Todo = { id: number; text: string };

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  return context;
};
