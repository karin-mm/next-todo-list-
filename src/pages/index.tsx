import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";

import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KTextField from "@/components/textfield/ktextfield";
import KButton from "@/components/button/kbutton";
import { addTodo, editTodo, deleteTodo, toggleTodo } from "@/app/features/todoslice";

export default function Home() {
  const todos = useSelector((s: RootState) => s.todos.items);
  const dispatch = useDispatch();

  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const newInputRef = useRef<HTMLInputElement>(null);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 3 }}>
      <Box
        sx={{
          maxWidth: 720,
          mx: "auto",
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Todo App
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <KTextField
            ref={newInputRef}
            type="new"
            value={newText}
            onChangeValue={setNewText}
            placeholder="Type a task and hit Enter"
          />
          <KButton
            kind="add"
            payloadText={newText}
            onClick={() => {
              if (newText.trim()) {
                dispatch(addTodo(newText.trim()));
                setNewText("");
                newInputRef.current?.focus();
              }
            }}
          >
            Add
          </KButton>
        </Box>

        {todos.map((t) => (
          <ListItem
            key={t.id}
            sx={{
              bgcolor: "background.paper",
              mb: 1,
              borderRadius: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Checkbox
              checked={t.completed}
              onChange={() => dispatch(toggleTodo(t.id))}
            />

            {editingId === t.id ? (
              <KTextField
                type="edit"
                value={editingText}
                onChangeValue={setEditingText}
                targetId={t.id}
                size="small"
                autoFocus
              />
            ) : (
              <ListItemText
                primary={t.text}
                sx={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              />
            )}

            <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
              {editingId === t.id ? (
                <KButton
                  kind="save"
                  targetId={t.id}
                  payloadText={editingText || undefined}
                  onClick={() => {
                    if (editingText.trim()) {
                      dispatch(
                        editTodo({ id: t.id, text: editingText.trim() })
                      );
                    }
                    setEditingId(null);
                    setEditingText("");
                  }}
                >
                  Save
                </KButton>
              ) : (
                <KButton
                  kind="edit"
                  onClick={() => {
                    setEditingId(t.id);
                    setEditingText(t.text);
                  }}
                >
                  Edit
                </KButton>
              )}

              <IconButton onClick={() => dispatch(deleteTodo(t.id))}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </Box>
    </Box>
  );
}
