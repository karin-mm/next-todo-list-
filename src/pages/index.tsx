import { useTodos } from "@/context/tododata";
import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";

export default function Home() {
  const { todos, addTodo, deleteTodo, editTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  return (
    <Box sx={{ p: 4, backgroundColor: "background.default", minHeight: "100vh" }}>
      <Paper sx={{ p: 3, maxWidth: 500, margin: "0 auto" }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <TextField
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            variant="outlined"
            label="New Task"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (newTodo.trim()) {
                addTodo(newTodo);
                setNewTodo("");
              }
            }}
          >
            Add
          </Button>
        </Box>

        <List>
          {todos.map((todo) => (
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
              {editingId === todo.id ? (
                <TextField
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  size="small"
                />
              ) : (
                <ListItemText primary={todo.text} />
              )}

              <Box sx={{ display: "flex", gap: 1 }}>
                {editingId === todo.id ? (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      editTodo(todo.id, editingText);
                      setEditingId(null);
                    }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditingText(todo.text);
                    }}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
