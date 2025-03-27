import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi";
import { useNavigate } from "react-router";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Paper,
  Button,
  Container,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CustomToolbar } from "./CustomToolbar";
import { useDeleteUser } from "../customHook/useDeleteUser";

export const UsersList = () => {
  const localUserList = JSON.parse(localStorage.getItem("users"));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    openDeleteDialog,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useDeleteUser(localUserList, setUsers);

  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await fetchUsers();

      setUsers(data);

      localStorage.setItem("users", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localUserList) {
      const sortedData = localUserList.sort((a, b) => a.id - b.id);
      setUsers(sortedData);
    } else {
      fetchData();
    }
  }, []);

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 250 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.id)}
        />,
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Users
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          height: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          loading={loading}
          pageSize={100}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          hideFooter={true}
          slots={{
            toolbar: CustomToolbar,
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              py: 1.5,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Paper>

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableRestoreFocus
        disableAutoFocus
        disableEnforceFocus
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
