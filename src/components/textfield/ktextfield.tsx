import React, { forwardRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "@/app/features/todoslice";

type FieldKind = "new" | "edit" | "search";

type Props = Omit<TextFieldProps, "onChange" | "value" | "onKeyDown" | "label"> & {
  type?: FieldKind;
  value: string;
  onChangeValue: (v: string) => void;

  targetId?: number;

  onSearch?: (q: string) => void;
};

const KTextField = forwardRef<HTMLInputElement, Props>(
  ({ type = "new", value, onChangeValue, targetId, onSearch, ...rest }, ref) => {
    const dispatch = useDispatch();

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key !== "Enter") return;
      const trimmed = value.trim();
      if (!trimmed) return;

      if (type === "new") {
        dispatch(addTodo(trimmed));
        onChangeValue("");
      } else if (type === "edit" && targetId) {
        dispatch(editTodo({ id: targetId, text: trimmed }));
      } else if (type === "search") {
        onSearch?.(trimmed);
      }
    };

    const label = type === "new" ? "New Task" : type === "edit" ? "Edit Task" : "Search";

    return (
      <TextField
        inputRef={ref}
        fullWidth
        variant="outlined"
        size="small"
        label={label}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        onKeyDown={onKeyDown}
        {...rest}
      />
    );
  }
);

KTextField.displayName = "KTextField";
export default KTextField;
