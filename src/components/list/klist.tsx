import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, deleteTodo } from "@/app/features/todoslice";
import { RootState } from "@/app/store";

type KListProps = {
  children?: React.ReactNode;
};

const KList: React.FC<KListProps> = ({ children }) => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch();

  return (
    <List>
      {children ? (
        children
      ) : (
        todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{
              backgroundColor: "background.paper",
              mb: 1,
              borderRadius: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() =>
                dispatch(editTodo({ id: todo.id, text: todo.text }))
              }
            />
            <ListItemText
              primary={todo.text}
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            />
            <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default KList;
