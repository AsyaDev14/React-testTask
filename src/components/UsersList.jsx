import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/users";
import { useNavigate } from "react-router";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const handleCreate = () => {
    navigate(`/users/new`);
  };

  // const handleDelete = (id) => {
  // };

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
          // onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleCreate}
        >
          Create User
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <h1>Users</h1>
      <Paper style={{ height: "calc(100vh - 150px)", width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          loading={loading}
          // pageSizeOptions={[5, 10, 25]}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{
            toolbar: CustomToolbar,
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Paper>
    </>
  );
};
