import React, { useEffect, useState } from "react";
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
import { editUser, fetchUsers, setUser } from "../api/users";

export const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
console.log('defaultValues', defaultValues);

  const fetchData = async () => {
    try {
      setDataLoading(true);
      const usersList = await fetchUsers();
      if (id) {
        const data = usersList.find((user) => user.id === parseInt(id));
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setDefaultValues({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      });
    }
  }, [user]);

  const onSubmit = (params) => {
    if (id) {
      editUser(id, params, handleBack);
    } else {
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
            Create New User
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              label="User Name"
              variant="outlined"
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
              label="Email"
              type="email"
              variant="outlined"
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
              label="Phone"
              variant="outlined"
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
