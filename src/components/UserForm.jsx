import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { editUser, setUser } from "../api/usersApi";

export const UserForm = () => {
  const localUserList = JSON.parse(localStorage.getItem("users"));

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const fetchData = async () => {
    try {
      if (id) {
        const data = localUserList.find((user) => user.id === parseInt(id));
        reset({
          name: data?.name || "",
          email: data?.email || "",
          phone: data?.phone || "",
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const onSubmit = async (params) => {
    if (id) {
      const changedUser = { ...params, id: parseInt(id) };
      const filteredList = localUserList.filter(
        (user) => user.id !== parseInt(id)
      );

      const newUserList = [...filteredList, changedUser];

      localStorage.setItem("users", JSON.stringify(newUserList));

      editUser(id, params, handleBack);
    } else {
      const newUserId = localUserList.length + 1;
      const newUser = { ...params, id: newUserId };
      const newUserList = [...localUserList, newUser];

      localStorage.setItem("users", JSON.stringify(newUserList));

      setUser(params, handleBack);
    }
  };

  const handleBack = () => {
    navigate("/users");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Users
        </Button>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {id ? "Edit User" : "Create New User"}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              placeholder="User Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              fullWidth
              margin="normal"
              placeholder="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              margin="normal"
              placeholder="Phone"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[\d+\s\-()]{7,20}$/,
                  message: "Invalid phone number",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                sx={{ mr: 2 }}
              >
                {id ? "Update User" : "Save User"}
              </Button>
              <Button variant="outlined" onClick={handleBack}>
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};
