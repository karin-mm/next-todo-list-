// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type Todo = { id: number; text: string; completed: boolean };

// type TodosState = {
//   items: Todo[];
// };

// const initialState: TodosState = {
//   items: [],
// };

// const todosSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     addTodo: (state, action: PayloadAction<string>) => {
//       if (!action.payload.trim()) return;
//       state.items.push({ id: Date.now(), text: action.payload.trim(), completed: false });
//     },
//     editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
//       const t = state.items.find((x) => x.id === action.payload.id);
//       if (t && action.payload.text.trim()) t.text = action.payload.text.trim();
//     },
//     deleteTodo: (state, action: PayloadAction<number>) => {
//       state.items = state.items.filter((t) => t.id !== action.payload);
//     },
//   },
// });

// export const { addTodo, editTodo, deleteTodo } = todosSlice.actions;
// export default todosSlice.reducer;







import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = { id: number; text: string; completed: boolean };

type TodosState = {
  items: Todo[];
};

const initialState: TodosState = {
  items: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim()) return;
      state.items.push({ id: Date.now(), text: action.payload.trim(), completed: false });
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const t = state.items.find((x) => x.id === action.payload.id);
      if (t && action.payload.text.trim()) t.text = action.payload.text.trim();
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, editTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
