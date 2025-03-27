import { TextField } from "@mui/material";

export const formFields = [
  {
    name: "name",
    label: "User Name",
    type: "text",
    validation: {
      required: "Name is required",
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    validation: {
      required: "Phone is required",
      pattern: {
        value: /^[\d+\s\-()]{7,20}$/,
        message: "Invalid phone number",
      },
    },
  },
];

export const FormTextField = ({ field, register, errors }) => (
  <TextField
    key={field.name}
    fullWidth
    margin="normal"
    label={field.label}
    type={field.type}
    {...register(field.name, field.validation)}
    error={!!errors[field.name]}
    helperText={errors[field.name]?.message}
  />
);
