import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

import { Box, Typography, ListItem, ListItemText } from "@mui/material";
import KTextField from "@/components/textfield/ktextfield";
import KButton from "@/components/button/kbutton";
import KList from "@/components/list/klist";

export default function Home() {
  const todos = useSelector((s: RootState) => s.todos.items);

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
            type="add"
            payloadText={newText}
            onClick={() => {
              setNewText("");
              newInputRef.current?.focus();
            }}
          >
            Add
          </KButton>
        </Box>

        <KList>
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
                <ListItemText primary={t.text} />
              )}

              <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                {editingId === t.id ? (
                  <KButton
                    type="save"
                    targetId={t.id}
                    payloadText={editingText}
                    onClick={() => {
                      setEditingId(null);
                      setEditingText("");
                    }}
                  >
                    Save
                  </KButton>
                ) : (
                  <KButton
                    type="edit"
                    onClick={() => {
                      setEditingId(t.id);
                      setEditingText(t.text);
                    }}
                  >
                    Edit
                  </KButton>
                )}

                <KButton type="delete" targetId={t.id}>
                  Delete
                </KButton>
              </Box>
            </ListItem>
          ))}
        </KList>
      </Box>
    </Box>
  );
}
