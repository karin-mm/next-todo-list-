import React, { forwardRef } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { addTodo, editTodo, deleteTodo } from "@/app/features/todoslice";

type ButtonKind = "add" | "edit" | "delete" | "save" | "primary";

type Props = Omit<ButtonProps, "onClick" | "color" | "variant" | "startIcon"> & {
  kind?: ButtonKind;
  targetId?: number;
  payloadText?: string;
  onClick?: () => void;
};

const icons: Record<Exclude<ButtonKind, "primary">, React.ReactElement> = {
  add: <AddIcon />,
  edit: <EditIcon />,
  delete: <DeleteIcon />,
  save: <SaveIcon />,
};

const KButton = forwardRef<HTMLButtonElement, Props>(
  ({ kind = "primary", payloadText, targetId, onClick, children, ...rest }, ref) => {
    const dispatch = useDispatch();

    const defaultAction = () => {
      if (kind === "add" && payloadText) dispatch(addTodo(payloadText));
      if ((kind === "edit" || kind === "save") && targetId && payloadText)
        dispatch(editTodo({ id: targetId, text: payloadText }));
      if (kind === "delete" && targetId) dispatch(deleteTodo(targetId));
    };

    const preset =
      kind === "delete"
        ? { variant: "outlined" as const, color: "error" as const, startIcon: icons.delete }
        : kind === "edit"
        ? { variant: "outlined" as const, color: "secondary" as const, startIcon: icons.edit }
        : kind === "save"
        ? { variant: "contained" as const, color: "secondary" as const, startIcon: icons.save }
        : kind === "add"
        ? { variant: "contained" as const, color: "primary" as const, startIcon: icons.add }
        : { variant: "contained" as const, color: "primary" as const };

    return (
      <Button ref={ref} {...preset} {...rest} onClick={onClick ?? defaultAction}>
        {children}
      </Button>
    );
  }
);

KButton.displayName = "KButton";
export default KButton;
